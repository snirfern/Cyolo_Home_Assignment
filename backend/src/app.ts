import express from 'express';
import config from './config/config';
import errorHandler from './application/middleware/errorHandler';

import logger from './infrastructure/logger/logger';
import imageRouter from './application/routes/imageRouter';
import { runWithRetry } from './infrastructure/utils/initUtils';
import { RedisConnectionManager } from './infrastructure/framework/redis/redis';
import sequelizeDB from './infrastructure/framework/db/sequelize';

const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(express.json());

app.use('/api', imageRouter);
app.use(errorHandler);

const PORT = config.server.port;

const server = app.listen(PORT, async () => {
  await runWithRetry(() => RedisConnectionManager.getConnection(config.dataSources.redis.dbConfig).connect());
  await runWithRetry(() => sequelizeDB.connect());
  logger.info(`Server running on http://localhost:${PORT}`);
});
export { app, server };
