import redis from 'redis';

const createRedis = redis.createClient({prefix: 'blacklist:'})

export default createRedis;