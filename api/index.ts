import type { Request, Response } from 'express';
import { app } from '../server/app.js';
import { connectDB } from '../server/db.js';

export default async function handler(req: Request, res: Response) {
  try {
    if (req.body && typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch (err) {}
    }
    await connectDB();
  } catch (e) {
    // If DB fails, local fallback in app will respond
  }
  return app(req, res);
}
