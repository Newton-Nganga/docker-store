import Redis from 'ioredis';
import logger from './logger.js';

const redis = new Redis(process.env.REDIS_URL);

redis.on('error', (error) => {
  logger.error('Redis connection error:', error);
});

redis.on('connect', () => {
  logger.info('Connected to Redis');
});

export default redis;