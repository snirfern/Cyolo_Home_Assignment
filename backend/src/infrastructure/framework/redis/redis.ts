import Redis, { Redis as RedisInstance } from 'ioredis';
import logger from '../../logger/logger';

export interface RedisConfig {
  host: string;
  port: number;
}

class RedisConnectionManager {
  private static connections: Map<string, RedisClient> = new Map();

  static getConnection(redisConfig: RedisConfig): RedisClient {
    const configKey = `${redisConfig.host}:${redisConfig.port}`;
    if (!this.connections.has(configKey)) {
      const redisClient = new RedisClient(redisConfig);
      this.connections.set(configKey, redisClient);
      logger.info(`Created new Redis connection for ${configKey}`);
    }

    return this.connections.get(configKey)!;
  }
}

class RedisClient {
  private client: RedisInstance;

  constructor(redisConfig: RedisConfig) {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      lazyConnect: true,
      retryStrategy: () => null
    });

    this.client.on('connect', () => {
      logger.info(`Successfully connected to Redis at ${redisConfig.host}:${redisConfig.port}`);
    });

    this.client.on('error', err => {
      logger.error(`error to ${redisConfig.host}:${redisConfig.port}: ${err}`);
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
    return;
  }

  async flushAll(): Promise<void> {
    await this.client.flushall();
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      logger.info('Redis connection closed successfully');
    } catch (error) {
      logger.error(`Error while closing Redis connection: ${error}`);
    }
  }

  async setKeyValue(key: string, value: string, expireInSeconds?: number): Promise<void> {
    try {
      if (expireInSeconds) {
        await this.client.set(key, value, 'EX', expireInSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error(`Error setting key in Redis: ${error}`);
      throw error;
    }
  }

  async getValueByKey(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error(`Error getting key from Redis: ${error}`);
      throw error;
    }
  }
}

export { RedisClient, RedisConnectionManager };
