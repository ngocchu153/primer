import type { NextApiRequest, NextApiResponse } from 'next';
import { sieveService } from 'services';
import logger from 'services/logger';
import { findLargestPrime } from 'utils';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<models.ApiResponse<number>>
) {
  const { inputNumber } = req.query;
  const number = parseInt(inputNumber as string, 10);
  logger.info(`Input number: ${number}`);
  if (!number || number < 2 || number > 9007199254740991) {
    const message =
      'This program only support input from 3 to 9007199254740991 (2^53 - 1)';
    logger.error(message);
    return res.status(400).json({ message });
  }

  if (number < 1000000) {
    logger.info('Looking up in seive...');
    const data = sieveService.findLargestPrime(number);
    if (data > 0) {
      logger.info(`Found in seive: ${data}`);
      res.setHeader('Cache-control', 'public, max-age=31536000');
      return res.status(200).json({ data });
    }
  }

  logger.info('Find Largest Prime (naive)...');
  const data = findLargestPrime(number);
  if (data > 0) {
    res.setHeader('Cache-control', 'public, max-age=31536000');
    return res.status(200).json({ data });
  }

  const message = `Not found highest prime number less than ${number}!`;
  logger.error(message);
  return res.status(404).json({ message });
}
