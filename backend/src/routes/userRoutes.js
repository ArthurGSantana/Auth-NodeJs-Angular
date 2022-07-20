import { Router } from 'express';

import authorization from './../middlewares/router-middlewares/authenticate.js';
import UserController from '../controllers/userController.js';

const router = Router();

router
  .get('/user/list', authorization.bearer, UserController.listUsers)
  .get('/user/search', UserController.getUserByEmail)
  .get('/user/check_email/:idUser', UserController.verifiedEmail)
  .get('/user/:idUser', UserController.getUser)
  .post('/user/login', authorization.local, UserController.login)
  .post('/user/updateToken', authorization.refresh, UserController.login)
  .post('/user/logout', [authorization.refresh, authorization.bearer], UserController.logout)
  .post('/user', UserController.createUser)
  .delete('/user/:idUser', authorization.bearer, UserController.deleteUser)

export default router;