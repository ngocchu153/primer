const logger = {
  format: {
    printf: jest.fn(),
    timestamp: jest.fn(),
    simple: jest.fn(),
    colorize: jest.fn(),
    combine: jest.fn(),
    splat: jest.fn(),
    errors: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
  createLogger: jest.fn().mockImplementation(function (creationOpts) {
    return {
      add: jest.fn(),
      info: console.info,
      warn: console.warn,
      error: console.error,
    };
  }),
};

export default logger;
