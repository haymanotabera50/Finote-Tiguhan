import type { Request, Response } from 'express';
import { app } from '../server/app';
import { connectDB } from '../server/db';

export default async function handler(req: Request, res: Response) {
  try {
    await connectDB();
  } catch (e) {
    // If DB fails, local fallback in app will respond
  }
  return app(req, res);
}
