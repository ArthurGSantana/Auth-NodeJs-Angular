import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserController from './../controllers/userController.js';
import blocklist from './../../redis/blocklist-access-token.js';

function checkUser(user) {
  if(!user) {
    throw new Error('E-mail inválido!');
  }
}

async function checkPassword(password, passwordHash) {
  const validPassword = await bcrypt.compare(password, passwordHash);

  if(!validPassword) {
    throw new Error('Senha inválida!')
  }
}

async function checkTokenList(token) {
  const tokenVerify = await blocklist.checkToken(token);

  if(tokenVerify) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!')
  }
}
 
export const passportUseLocal = passport.use(
  new LocalStrategy({
    usernameField: 'email',
    session: false
    // passwordField: 'senha'

  }, async (email, password, done) => {
    try {
      const user = await UserController.getUserByEmailStrategy(email);
      checkUser(user);
      await checkPassword(password, user.password);

      done(null, user);

    } catch(error) {
      done(error);
    }
  })
)

export const passportUseBearer = passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await checkTokenList(token);
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const user = await UserController.getUserStrategy(payload.id);
        done(null, user, {token});

      } catch(error) {
        done(error);
      }
    }
  )
)

