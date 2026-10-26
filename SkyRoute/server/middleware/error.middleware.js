export function notFound(req, res) { res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} was not found.` }); }
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err.message);
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'That value is already registered.' });
  const status = err.status || 500;
  res.status(status).json({ success: false, message: status === 500 ? 'Something went wrong on our side.' : err.message });
}
