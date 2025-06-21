import { MAX } from 'max-exchange-api-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

if (!process.env.MAX_API_KEY || !process.env.MAX_API_SECRET) {
  console.error('Error: MAX_API_KEY or MAX_API_SECRET is missing in .env file');
  process.exit(1);
}
// Configuration
const max = new MAX({
  accessKey: process.env.MAX_API_KEY,
  secretKey: process.env.MAX_API_SECRET,
});
const customCeil = (value, count = 2) => {
  const base = 10 ** count
  return (Math.ceil((value * base)) / base).toFixed(count)
}
(async () => {
  try {
    const twdAmount = customCeil(0.5 / 0.0015); //保持最低手續費，因為0.5會四捨五入成1元，1元會開發票

    // 獲取 usdttwd 交易對的當前市場價格
    const ticker = await max.rest.getTicker({ market: 'usdttwd' });
    const currentPrice = parseFloat(ticker.last); // 假設 ticker.last 是最新價格（TWD/USDT）

    if (!currentPrice) {
      throw new Error('Failed to fetch market price for usdttwd');
    }

    // 計算需要的 USDT 數量
    const volume = customCeil(twdAmount / currentPrice); // volume = TWD 金額 ÷ 價格（TWD/USDT）
    console.log(`Calculated USDT volume: ${volume} USDT at price ${currentPrice} TWD/USDT`);
    return
    const order = await max.rest.spotWallet.submitOrder({
      market: 'usdttwd',
      side: 'sell', // Sell USDT for TWD
      volume,
      ord_type: 'market', // Limit order
    });
    console.log('Sell Order Placed:', order);
  } catch (error) {
    console.error('Full Error:', JSON.stringify(error, null, 2));
    console.error('Failed to place sell order:', error.message);
  }
})();
