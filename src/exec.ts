import { buy } from "./buy";
import type { Env } from "./Env";
import { sendTelegramMessage } from "./sendTelegramMessage";

export const exec = async (env: Env) => {
  const message = await buy(env.MAX_API_KEY, env.MAX_API_SECRET);

  await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, message);
}