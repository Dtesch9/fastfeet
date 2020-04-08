import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

export default new Brute(bruteStore);
