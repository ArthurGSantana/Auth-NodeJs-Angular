import redis from 'redis';

const redisClient = redis.createClient(6379, "127.0.0.1", { prefix: "blacklist:" });
redisClient.on("connect", () => console.log("Connected to Redis!"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

export default redisClient;