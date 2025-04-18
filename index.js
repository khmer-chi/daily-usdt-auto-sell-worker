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

(async () => {
  try {
    const order = await max.rest.spotWallet.submitOrder({
      market: 'usdttwd',
      side: 'sell', // Sell USDT for TWD
      volume: '22', // Amount of USDT to sell
      ord_type: 'market', // Limit order
    });
    console.log('Sell Order Placed:', order);
  } catch (error) {
    console.error('Full Error:', JSON.stringify(error, null, 2));
    console.error('Failed to place sell order:', error.message);
  }
})();