import mockedWinston from '__mocks__/winstons.mock';
import logger from '../logger';

jest.mock('winston', () => mockedWinston);

describe('logger', () => {
  afterEach(() => jest.clearAllMocks());

  test('should create on called', () => {
    logger.info('should work');
    expect(mockedWinston.createLogger).toBeCalledTimes(1);
  });
});
