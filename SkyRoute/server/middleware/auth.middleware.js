import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';
export function requireAuth(req, res, next) {
  const token = req.cookies?.skyroute_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(new AppError('Please sign in to continue.', 401));
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch { next(new AppError('Your session has expired. Please sign in again.', 401)); }
}
