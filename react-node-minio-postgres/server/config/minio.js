import { Client } from 'minio';
import logger from './logger.js';

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

export const initializeMinio = async () => {
  const bucketName = 'uploads';
  
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName);
      logger.info(`Created bucket: ${bucketName}`);
    }
  } catch (err) {
    logger.error('Error initializing MinIO:', err);
  }
};

export default minioClient;