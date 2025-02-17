import CacheHelper from '../../../../src/infrastructure/utils/cacheHelper';
import { RedisConfig, RedisConnectionManager, RedisClient } from '../../../../src/infrastructure/framework/redis/redis';

jest.mock('../../../../src/infrastructure/framework/redis/redis', () => ({
  __esModule: true,
  RedisConnectionManager: {
    getConnection: jest.fn()
  }
}));

describe('CacheHelper', () => {
  let cacheHelper: CacheHelper;
  let mockRedisInstance: Partial<RedisClient>;
  let mockConfig: RedisConfig;

  beforeEach(() => {
    mockRedisInstance = {
      setKeyValue: jest.fn().mockResolvedValue(undefined) as jest.Mock,
      getValueByKey: jest.fn().mockResolvedValue(null) as jest.Mock
    };

    mockConfig = { host: 'mock host', port: 12 } as RedisConfig;

    (RedisConnectionManager.getConnection as jest.Mock).mockReturnValue(mockRedisInstance);

    cacheHelper = new CacheHelper(mockConfig);
  });

  test('should call redisInstance.setKeyValue with correct arguments', async () => {
    await cacheHelper.setValue('testKey', 'testValue', 60);

    expect(mockRedisInstance.setKeyValue).toHaveBeenCalledWith('testKey', 'testValue', 60);
    expect(mockRedisInstance.setKeyValue).toHaveBeenCalledTimes(1);
  });

  test('should call redisInstance.getValueByKey and return parsed value', async () => {
    const mockData = { foo: 'bar' };
    (mockRedisInstance.getValueByKey as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const result = await cacheHelper.getValue('testKey');

    expect(mockRedisInstance.getValueByKey).toHaveBeenCalledWith('testKey');
    expect(mockRedisInstance.getValueByKey).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  test('should return null when redisInstance.getValueByKey returns null', async () => {
    (mockRedisInstance.getValueByKey as jest.Mock).mockResolvedValue(null);

    const result = await cacheHelper.getValue('nonexistentKey');

    expect(mockRedisInstance.getValueByKey).toHaveBeenCalledWith('nonexistentKey');
    expect(result).toBeNull();
  });
});
