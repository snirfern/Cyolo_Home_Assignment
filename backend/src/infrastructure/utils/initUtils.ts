import logger from '../logger/logger';

export const runWithRetry = async (
  func: (args?: any) => void,
  maxRetries: number = 5,
  retryDelay: number = 5000,
  ...args: any[]
) => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      await func(...args);
      return;
    } catch (error) {
      retryCount++;

      if (error instanceof Error) {
        logger.error(`${func.name} connection failed: ${error.message}`);
      } else {
        logger.error(`${func.name} connection failed: Unknown error`);
      }

      if (retryCount < maxRetries) {
        logger.info(`Retrying connection... Attempt ${retryCount}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        retryDelay *= 2;
      } else {
        logger.error(`Maximum retry attempts reached for ${func.name}.`);
      }
    }
  }
};
