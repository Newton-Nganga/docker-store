import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  logger.info(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

export default prisma;