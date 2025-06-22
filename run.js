import dotenv from 'dotenv';
import { Miniflare } from 'miniflare';

const mf = new Miniflare({
    scriptPath: './src/index.ts',
    bindings: { ...dotenv.config().parsed },
});
// const request = new Request('http://localhost:8787');
// const response = await mf.dispatchFetch(request);
// console.log(await response.text());
