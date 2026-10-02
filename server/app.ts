import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes.js';
import { renderAdminHtml } from './adminHtml.js';

dotenv.config();

export const app = express();

app.use(cors());

// Safe body-parser middleware compatible with both standalone Express and Vercel Serverless Function
app.use((req, res, next) => {
  if (req.body !== undefined && typeof req.body === 'object') {
    return next();
  }
  if (req.body && typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
      return next();
    } catch (e) {
      // not JSON string, continue
    }
  }
  express.json()(req, res, (err) => {
    // If stream was already consumed by serverless runtime, ignore body-parser stream error
    if (err) {
      return next();
    }
    next();
  });
});

app.use((req, res, next) => {
  if (req.body !== undefined && typeof req.body === 'object') {
    return next();
  }
  express.urlencoded({ extended: true })(req, res, () => next());
});

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
