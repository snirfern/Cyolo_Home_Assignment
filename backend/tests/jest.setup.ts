import { runWithRetry } from '../src/infrastructure/utils/initUtils';
import { RedisClient, RedisConnectionManager } from '../src/infrastructure/framework/redis/redis';
import logger from '../src/infrastructure/logger/logger';
import config from '../src/config/config';
import sequelizeDB from '../src/infrastructure/framework/db/sequelize';

let redisClient: RedisClient;
beforeAll(async () => {
  redisClient = RedisConnectionManager.getConnection(config.dataSources.redis.dbConfig);

  await runWithRetry(() => sequelizeDB.connect());
  await runWithRetry(() => redisClient.connect());
  await redisClient.flushAll();
  logger.info('Database setup completed successfully before tests.');
});

afterAll(async () => {
  await sequelizeDB.disconnect();
  await redisClient.disconnect();
  logger.info('Test environment cleaned up after all tests.');
});
