import { MAX } from 'max-exchange-api-node';
// import { fetchTicker } from './fetchTicker';
import { makeRequest } from './makeRequest';
const customCeil = (value: number, count = 2) => {
  const base = 10 ** count
  const result = (Math.ceil((value * base)) / base)

  return parseFloat(result.toFixed(count))
}
export const buy = async (accessKey: string, secretKey: string) => {
  if (!accessKey || !secretKey) {
    throw new Error('Error: MAX_API_KEY or MAX_API_SECRET is missing in .env file');
  }
  const messageArray: string[] = []
  // Configuration
  const max = new MAX({ accessKey, secretKey, });

  const twdAmount = customCeil(0.5 / 0.0015); //保持最低手續費，因為0.5會四捨五入成1元，1元會開發票
  // // 獲取 usdttwd 交易對的當前市場價格
  const ticker = await max.rest.getTicker({ market: 'usdttwd' });
  const currentPrice = ticker.last.toNumber(); // 假設 ticker.last 是最新價格（TWD/USDT）
  if (!currentPrice) {
    throw new Error('Failed to fetch market price for usdttwd');
  }

  // 計算需要的 USDT 數量
  const volume = customCeil(twdAmount / currentPrice, 2).toFixed(2); // volume = TWD 金額 ÷ 價格（TWD/USDT）
  messageArray.push(`Calculated USDT volume: ${volume} USDT at price ${currentPrice} TWD/USDT`)
  const order = await max.rest.spotWallet.submitOrder({
    market: 'usdttwd',
    side: 'sell', // Sell USDT for TWD
    volume,
    ord_type: 'market', // Limit order
  });
  messageArray.push('Sell Order Placed:', JSON.stringify(order, null, 4))

  return messageArray.join("\n")
}

