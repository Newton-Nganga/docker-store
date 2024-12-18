import prisma from '../config/database.js';
import redis from '../config/redis.js';
import logger from '../config/logger.js';

export const createSession = async (userId, token, expiresAt) => {
  try {
    const session = await prisma.session.create({
      data: { userId, token, expiresAt }
    });
    await redis.set(`session:${token}`, JSON.stringify(session), 'EX', 900); // 15 minutes
    return session;
  } catch (error) {
    logger.error('Session creation error:', error);
    throw error;
  }
};

export const invalidateSession = async (token) => {
  try {
    await prisma.session.delete({ where: { token } });
    await redis.del(`session:${token}`);
  } catch (error) {
    logger.error('Session invalidation error:', error);
    throw error;
  }
};