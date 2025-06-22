interface OrderParams {
    market: string;
    side: 'buy' | 'sell';
    volume: string;
    price: string;
    ord_type: 'limit' | 'market';
}

interface MakeRequestOptions {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
    params?: Record<string, any>;
}


async function hmacSHA256(key: string, message: string): Promise<string> {
    const enc = new TextEncoder();
    const keyData = enc.encode(key);
    const msgData = enc.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    return [...new Uint8Array(signature)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function makeRequest<T = any>(
    path: string,
    { method = 'GET', params = {} }: MakeRequestOptions = {},
    accessKey: string, secretKey: string,
): Promise<T> {
    const baseUrl = 'https://max-api.maicoin.com/api/v3';
    const timestamp = Date.now().toString();

    let bodyStr = '';
    let url = `${baseUrl}${path}`;

    if (method === 'GET' && Object.keys(params).length > 0) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    } else if (['POST', 'DELETE', 'PUT'].includes(method)) {
        bodyStr = JSON.stringify(params);
    }
    console.log({ url, bodyStr })
    const signatureBase = `${method}\n${path}\n${timestamp}\n${bodyStr}`;
    const signature = await hmacSHA256(secretKey, signatureBase);

    const headers = {
        'X-MAX-ACCESSKEY': accessKey,
        'X-MAX-TIMESTAMP': timestamp,
        'X-MAX-SIGNATURE': signature,
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Worker/1.0',
    };

    const response = await fetch(url, {
        method,
        headers,
        ...(bodyStr && method !== 'GET' ? { body: bodyStr } : {}),
    });

    const data = await response.json();
    return data as any;
}
