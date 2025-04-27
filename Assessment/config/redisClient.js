// config/redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
      host: '127.0.0.1',
      port: 6379,
      reconnectStrategy: (retries) => Math.min(retries * 50, 2000) // retry connection
    }
  });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();  // Important!

export default redisClient;
