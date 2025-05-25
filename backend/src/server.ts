import app from './app';
import http from 'http';

const PORT = process.env.PORT || 5001; // Changed from 5000 to avoid potential conflict with React dev server

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

// Basic error handling for server startup
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}); 