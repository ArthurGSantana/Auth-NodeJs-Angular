import { Router } from 'express';
import passport from 'passport';

import UserController from '../controllers/userController.js';

const router = Router();

router
  .get('/user/list', UserController.listUsers)
  .get('/user/search', UserController.getUserByEmail)
  .get('/user/:idUser', UserController.getUser)
  .post('/user', UserController.createUser)
  .post('/user/login', passport.authenticate('local', {session: false}), UserController.login)
  .delete('/user/:idUser', UserController.deleteUser)

export default router;