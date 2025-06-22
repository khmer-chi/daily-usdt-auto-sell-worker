export async function sendTelegramMessage(token: string, chatId: string, message: string) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }),
        });
        if (!response.ok) {
            throw new Error(`Telegram API error: ${await response.text()}`);
        }
        return true;
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Failed to send Telegram message: ${e.message}`);

        }
    }
    return false;
}