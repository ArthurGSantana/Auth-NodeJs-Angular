import express from 'express';

import userRoutes from './userRoutes.js';

const routes = (app) => {

  app.use(
    express.json(),
    userRoutes
  )
}

export default routes;