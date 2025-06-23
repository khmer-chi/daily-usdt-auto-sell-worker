import dotenv from 'dotenv';
import { exec } from './exec';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const envPath = resolve(__dirname, '../.dev.vars');
await exec(dotenv.config({ path: envPath }).parsed as any as Env)
