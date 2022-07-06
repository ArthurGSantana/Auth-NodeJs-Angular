import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

import blocklist from './blocklist.js';

function createTokenHash(token) {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}

const redisClient = {
  addToken: async token => {
    const dateExp = jwt.decode(token).exp;
    const tokenHash = createTokenHash(token);

    await blocklist.set(tokenHash, '');
    blocklist.expireAt(tokenHash, dateExp);
  },
  checkToken: async token => {
    const tokenHash = createTokenHash(token);
    const result = await blocklist.exists(tokenHash);
    
    return result === 1;
  }
}

export default redisClient;