import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

import blocklist from './redis/blocklist-access-token.js';
import allowlist from './redis/allowlist-refresh-token.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`)
})