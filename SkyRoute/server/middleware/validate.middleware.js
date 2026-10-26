import { validationResult } from 'express-validator';
import { AppError } from '../utils/appError.js';
export function validate(req, res, next) { const errors = validationResult(req); if (!errors.isEmpty()) return next(new AppError(errors.array()[0].msg, 422)); next(); }
