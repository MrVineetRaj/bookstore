import { createServer } from 'http';
import { createApp } from './app';
import logger from './logger';

async function main() {
  try {
    const PORT = process.env.PORT ?? 3000;
    const server = createServer(createApp());

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
}

main();
