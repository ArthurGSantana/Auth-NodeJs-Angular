import redis from 'redis';

import listController from './listController.js';

const allowlist = redis
  .createClient(6379, "127.0.0.1", {prefix: 'allowlist-refresh-token:'});

allowlist.on("connect", () => {});
allowlist.on("error", (err) => console.log("Redis Client Error", err));
allowlist.connect();


export default listController(allowlist);