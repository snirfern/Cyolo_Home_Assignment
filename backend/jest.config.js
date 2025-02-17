/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  testTimeout: 90000,
  maxWorkers: 1,
  setupFilesAfterEnv: ['./tests/jest.setup.ts']
};
