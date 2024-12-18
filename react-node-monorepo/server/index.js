import express from 'express';
import ViteExpress from 'vite-express';
import helloRoutes from './routes/hello.js';

const app = express();
const port = 3000;

// API Routes
app.use('/api', helloRoutes);

// Start server
ViteExpress.listen(app, port, () => {
  console.log(`Server is listening on port ${port}`);
});