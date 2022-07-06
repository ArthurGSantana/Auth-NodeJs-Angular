import redis from 'redis';

import listController from './listController.js';

const allowlist = redis
  .createClient({prefix: 'allowlist-refresh-token:'});

export default listController(allowlist);