import { app } from './app.js';
import { connectDB } from './db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Express Backend is listening on port ${PORT}`);
    console.log(`[Server] API available at: http://localhost:${PORT}/api`);
    console.log(`[Server] Admin Portal at: http://localhost:${PORT}/admin`);
  });
}

startServer().catch((err) => {
  console.error('[Server Error] Failed to start:', err);
});
