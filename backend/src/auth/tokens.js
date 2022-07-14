import jwt from 'jsonwebtoken';
import crypto from  'crypto';
import moment from 'moment';

import allowlistRefreshToken from './../../redis/allowlist-refresh-token.js';
import blocklistAccessToken from './../../redis/blocklist-access-token.js';

function createTokenJWT(user, [timeQtd, timeUn]) {
  const payload = {
    id: user._id,
    name: user.name ?? 'Teste'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: `${timeQtd}${timeUn}`});

  return token;
}

async function checkTokenJWT(token, blocklist) {
  await checkTokenList(token, blocklist);
  const {id} = jwt.verify(token, process.env.JWT_KEY);

  return id;
}

async function checkTokenList(token, blocklist) {
  const tokenVerify = await blocklist.checkToken(token);

  if(tokenVerify) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!')
  }
}

function invalidTokenJWT(token, blocklist) {
  return blocklist.addToken(token);
}

async function createTokenOpaque(id, [timeQt, timeUn], allowlist) {
  try {
    const tokenOpaque = crypto.randomBytes(24).toString('hex');
    const dateExp = moment().add(timeQt, timeUn).unix();
    await allowlist.add(tokenOpaque, id.toString(), dateExp);
    return tokenOpaque;

  } catch(error) {
    throw new Error(error)
  }
}

async function checkTokenOpaque(token, name, allowlist) {
  if(!token) {
    throw new Error(`${name} não enviado!`);
  }

  const id = await allowlist.getValue(token);

  if(!id) {
    throw new Error(`${name} inválido!`)
  }

  return id;
}

function invalidTokenOpaque(token, allowlist) {
  return allowlist.delete(token);
}

const tokens = {
  access: {
    list: blocklistAccessToken,
    expire: [15, 'm'],

    create(user) {
      return createTokenJWT(user, this.expire);
    },
    check(token) {
      return checkTokenJWT(token, this.list);
    },
    invalid(token) {
      return invalidTokenJWT(token, this.list);
    }
  },

  refresh: {
    name: 'Refresh Token',
    list: allowlistRefreshToken,
    expire: [5, 'd'],

    create(id) {
      console.log(id)
      return createTokenOpaque(id, this.expire, this.list)
    },
    check(token) {
      return checkTokenOpaque(token, this.name, this.list);
    },
    invalid(token) {
      return invalidTokenOpaque(token, this.list);
    }
  }
}

export default tokens;