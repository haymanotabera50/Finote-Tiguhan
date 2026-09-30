import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { apiRouter } from './routes';
import { renderAdminHtml } from './adminHtml';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Visual Admin Portal & Database Gateway (for browser requests)
app.get(['/', '/admin', '/login', '/dashboard'], (_req, res) => {
  res.type('html').send(renderAdminHtml());
});

// Mount API routes (includes GET /api with browser HTML fallback & JSON discovery)
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Finote Teguhan Sunday School API',
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Express Backend is listening on port ${PORT}`);
    console.log(`[Server] API available at: http://localhost:${PORT}/api`);
  });
}

startServer().catch((err) => {
  console.error('[Server Error] Failed to start:', err);
});
