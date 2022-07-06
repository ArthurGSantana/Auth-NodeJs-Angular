import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

import blacklist from './blacklist.js';

function createTokenHash(token) {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}

const redisClient = {
  addToken: async token => {
    const dateExp = jwt.decode(token).exp;
    const tokenHash = createTokenHash(token);

    await blacklist.set(tokenHash, '');
    blacklist.expireAt(tokenHash, dateExp);
  },
  checkToken: async token => {
    const tokenHash = createTokenHash(token);
    const result = await blacklist.exists(tokenHash);
    
    return result === 1;
  }
}

export default redisClient;