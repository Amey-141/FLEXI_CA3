import 'dotenv/config'; import { connectDb } from './config/db.js'; import app from './app.js';
const port = process.env.PORT || 5000; connectDb().then(() => app.listen(port, () => console.log(`SkyRoute API listening on http://localhost:${port}`))).catch(err => { console.error('Unable to start SkyRoute:', err.message); process.exit(1); });
