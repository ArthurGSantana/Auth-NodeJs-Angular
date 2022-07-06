import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import redis from './redis/blacklist.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`)
})