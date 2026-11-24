import { createApp } from './app.js';
import { JsonDatabase } from './db.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3010;
const db = new JsonDatabase();
const app = createApp(db);

app.listen(PORT, () => {
  console.log(`CRM Demo API server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
