import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

import redis from 'redis';

const blocklist = redis
.createClient(6379, "127.0.0.1", { prefix: "blocklist-access-token:" });

blocklist.on("connect", () => {});
blocklist.on("error", (err) => console.log("Redis Client Error", err));
blocklist.connect();

import listController from './listController.js';
const blocklistControl = listController(blocklist);

function createTokenHash(token) {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}

const redisClient = {
  addToken: async token => {
    const dateExp = jwt.decode(token).exp;
    const tokenHash = createTokenHash(token);

    await blocklistControl.add(tokenHash, '', dateExp);
  },
  checkToken: async token => {
    const tokenHash = createTokenHash(token);
    
    return blocklistControl.checkKey(tokenHash);
  }
}

export default redisClient;