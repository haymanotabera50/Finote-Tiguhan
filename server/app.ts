import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes.js';
import { renderAdminHtml } from './adminHtml.js';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

// Visual Admin Portal & Database Gateway (for browser requests)
app.get(['/', '/admin', '/login', '/dashboard'], (_req, res) => {
  res.type('html').send(renderAdminHtml());
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Finote Teguhan Sunday School API',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api', apiRouter);
// Also mount at root for Vercel Serverless Function compatibility when rewrites strip /api prefix
app.use('/', apiRouter);
