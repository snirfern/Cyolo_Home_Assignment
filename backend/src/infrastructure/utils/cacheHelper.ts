import { RedisClient, RedisConfig, RedisConnectionManager } from '../framework/redis/redis';

class CacheHelper {
  private redisInstance: RedisClient;

  constructor(config: RedisConfig) {
    this.redisInstance = RedisConnectionManager.getConnection(config);
  }

  async setValue(key: string, value: string, expiration?: number): Promise<void> {
    await this.redisInstance.setKeyValue(key, value, expiration);
  }

  async getValue<T>(key: string): Promise<T | null> {
    const value = await this.redisInstance.getValueByKey(key);
    return value ? JSON.parse(value) : null;
  }
}

export default CacheHelper;
