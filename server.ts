import express from 'express';
import next from 'next';
import rateLimit from 'express-rate-limit';
import { buildSieve } from './utils/prime';

const MAX_REQUESTS = 100;
const RATE_LIMIT_TIMEFRAME = 10;

const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT_TIMEFRAME * 60 * 1000, // 10 minutes
  max: MAX_REQUESTS, // Limit each IP to 100 requests per windowsMs
  standardHeaders: true,
  legacyHeaders: false,
  message: async () => {
    return {
      message: `You can only make ${MAX_REQUESTS} requests every ${RATE_LIMIT_TIMEFRAME} minutes.`,
    };
  },
});

const port = parseInt(process.env.PORT ?? '3000', 10);
const hostname = 'localhost';
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.locals.sieve = buildSieve();

  server.use('/api/v1', apiLimiter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.info(`> Ready on http://${hostname}:${port}`);
  });
});
