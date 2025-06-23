import dotenv from 'dotenv';
import { exec } from './exec';

await exec(dotenv.config({ path: '.dev.vars' }).parsed as any as Env)
