import prisma from '../config/database.js';
import { hashPassword } from '../utils/security.js';
import logger from '../config/logger.js';

export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  
  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });
    return { ...user, password: undefined };
  } catch (error) {
    logger.error('User creation error:', error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};