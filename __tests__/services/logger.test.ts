import mockedWinston from '__mocks__/winstons.mock';
import logger from 'services/logger';

jest.mock('winston', () => mockedWinston);

describe('logger', () => {
  afterAll(() => jest.clearAllMocks());

  test('Should return -1 when input is invalid', () => {
    // const logger = require('services/logger');
    logger.info('should work');
    expect(mockedWinston.createLogger).toBeCalledTimes(1);
  });
});
