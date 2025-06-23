import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Env } from './Env';
import { buy } from './buy';
import { sendTelegramMessage } from './sendTelegramMessage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const envPath = resolve(__dirname, '../.env');
const env = dotenv.config({ path: envPath }).parsed as unknown as Env

const message = await buy(env.MAX_API_KEY, env.MAX_API_SECRET);

await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, message);