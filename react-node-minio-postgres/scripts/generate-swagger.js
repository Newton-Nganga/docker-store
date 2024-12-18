import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservices API',
      version: '1.0.0',
      description: 'API documentation for the microservices application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server/routes/*.js'],
};

const specs = swaggerJsdoc(options);
fs.writeFileSync(
  path.join(process.cwd(), 'openapi.json'),
  JSON.stringify(specs, null, 2)
);