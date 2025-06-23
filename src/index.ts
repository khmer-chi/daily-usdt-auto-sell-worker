import dotenv from 'dotenv';
import { exec } from './exec';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Env } from './Env';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const envPath = resolve(__dirname, '../.env');

await exec(dotenv.config({ path: envPath }).parsed as unknown as Env)
