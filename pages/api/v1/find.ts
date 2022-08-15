import { DEFAULT_SIEVE_LIMIT, MAX_INT } from 'consts';
import { Request } from 'express';
import type { NextApiRequest, NextApiResponse } from 'next';
import logger from 'services/logger';
import { findLargestPrime, findLargestPrimeInSieve } from 'utils/prime';

/**
 * @swagger
 * /api/v1/find:
 *   get:
 *     description: Returns largest prime number less than input
 *     parameters:
 *       - in: query
 *         name: input
 *         schema:
 *           type: integer
 *           description: The number you want to find largest prime right below it
 *     responses:
 *       200:
 *         description: Successfully find the output
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: number
 *       400:
 *         description: Bad Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export default function handler(
  req: NextApiRequest & Request,
  res: NextApiResponse<models.ApiResponse<number>>
) {
  const { input } = req.query;
  const number = parseInt(input as string, 10);
  logger.info(`Input number: ${number}`);
  if (!number || number < 2 || number > MAX_INT) {
    const message = `This program only support input from 3 to ${MAX_INT} (2^53 - 1)`;
    logger.error(message);
    return res.status(400).json({ message });
  }

  if (number < DEFAULT_SIEVE_LIMIT) {
    logger.info('Looking up in sieve...');
    const { sieve } = req.app.locals;
    const data = findLargestPrimeInSieve(number, sieve);
    if (data > 0) {
      logger.info(`Found in sieve: ${data}`);
      res.setHeader('Cache-control', 'public, max-age=31536000');
      return res.status(200).json({ data });
    }

    const message = `Not found prime number less than ${number}!`;
    logger.error(`[Sieve] ${message}`);
    return res.status(404).json({ message });
  }

  logger.info('Find Largest Prime (naive)...');
  const data = findLargestPrime(number);
  if (data > 0) {
    res.setHeader('Cache-control', 'public, max-age=31536000');
    return res.status(200).json({ data });
  }

  const message = `Not found prime number less than ${number}!`;
  logger.error(message);
  return res.status(404).json({ message });
}
