import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getLogger = () => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
  });

  const myFormat = [
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.errors({ stack: true }),
    format.printf((info) => {
      return `${info.timestamp} [${info.level}] : ${info.message}`;
    }),
  ];

  const consoleTransport = new transports.Console({
    level: 'info',
    handleExceptions: false,
    format: format.combine(format.colorize(), ...myFormat),
  });

  const logger = createLogger({
    level: 'info',
    handleExceptions: false,
    format: format.combine(...myFormat),
    transports: [consoleTransport],
  });

  if (process.env.NODE_ENV === 'production') {
    logger.add(fileLogTransport);
  }

  return logger;
};

export default getLogger();
