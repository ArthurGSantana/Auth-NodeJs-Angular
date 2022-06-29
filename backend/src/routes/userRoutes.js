import { Router } from 'express';

import UserController from '../controllers/userController.js';

const router = Router();

router
  .get('/user/:idUser', UserController.getUser)
  .post('/user', UserController.createUser)

export default router;