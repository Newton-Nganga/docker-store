import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

import { sessionConfig } from './config/session.js';
import { errorHandler } from './middleware/error.js';
import { initializeMinio } from './config/minio.js';
import authRoutes from './routes/auth.routes.js';
import logger from './config/logger.js';

const app = express();
const port = process.env.PORT || 3001; // Changed to 3001 for Caddy proxy

// Trust proxy headers from Caddy
app.set('trust proxy', true);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfig));

// API Routes
app.use('/api/auth', authRoutes);

// Swagger documentation
const swaggerDocument = JSON.parse(readFileSync('./openapi.json', 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use(errorHandler);

// Initialize services
initializeMinio().catch(logger.error);

// Start server
const server = ViteExpress.listen(app, port, () => {
  logger.info(`Server is listening on port ${port}`);
});

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  next();
});

export { app, io };