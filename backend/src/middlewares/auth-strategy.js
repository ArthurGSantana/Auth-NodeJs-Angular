import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserController from './../controllers/userController.js';

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
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const user = await UserController.getUserStrategy(payload.id);
        done(null, user);

      } catch(error) {
        done(error);
      }
    }
  )
)

