import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import logger from '../config/logger.js';

const prisma = new PrismaClient();

export const generateTokens = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });

  return { token, refreshToken };
};

export const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return await generateTokens(decoded.userId);
  } catch (error) {
    logger.error('Token refresh error:', error);
    throw new Error('Invalid refresh token');
  }
};