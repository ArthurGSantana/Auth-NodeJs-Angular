import { Router } from 'express';

import authorization from './../middlewares/router-middlewares/authenticate.js';
import UserController from '../controllers/userController.js';

const router = Router();

router
  .get('/user/list', authorization.bearer, UserController.listUsers)
  .get('/user/search', UserController.getUserByEmail)
  .get('/user/:idUser', UserController.getUser)
  .post('/user', UserController.createUser)
  .post('/user/login', authorization.local, UserController.login)
  .delete('/user/:idUser', authorization.bearer, UserController.deleteUser)

export default router;