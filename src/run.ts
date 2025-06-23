import dotenv from 'dotenv';
import { exec } from './exec';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
console.log(123)
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const envPath = resolve(__dirname, '../.dev.vars');
console.log({ envPath })
await exec(dotenv.config({ path: envPath }).parsed as any as Env)
