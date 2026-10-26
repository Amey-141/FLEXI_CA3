export class AppError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
export const reference = prefix => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}${Date.now().toString().slice(-4)}`;
