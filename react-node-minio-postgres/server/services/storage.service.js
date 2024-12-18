import minioClient from '../config/minio.js';
import logger from '../config/logger.js';

export const uploadFile = async (bucketName, fileName, fileStream, metadata = {}) => {
  try {
    await minioClient.putObject(bucketName, fileName, fileStream, metadata);
    return {
      url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`
    };
  } catch (error) {
    logger.error('File upload error:', error);
    throw error;
  }
};

export const getFileUrl = async (bucketName, fileName) => {
  try {
    return await minioClient.presignedGetObject(bucketName, fileName, 24 * 60 * 60); // 24 hours
  } catch (error) {
    logger.error('Get file URL error:', error);
    throw error;
  }
};