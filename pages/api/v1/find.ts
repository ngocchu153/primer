import type { NextApiRequest, NextApiResponse } from 'next';
import { sieveService } from 'services';
import { findLargestPrime } from 'utils';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<models.ApiResponse<number>>
) {
  const { inputNumber } = req.query;
  const number = parseInt(inputNumber as string, 10);
  console.log(`Input number: ${number}`);
  if (!number || number < 2 || number > 9007199254740991) {
    return res.status(400).json({
      message:
        'This program only support input from 3 to 9007199254740991 (2^53 - 1)',
    });
  }

  if (number < 1000000) {
    console.log('Looking up in seive...');
    const data = sieveService.findLargestPrime(number);
    if (data > 0) {
      console.log(`Found in seive: ${data}`);
      res.setHeader('Cache-control', 'public, max-age=31536000');
      return res.status(200).json({ data });
    }
  }

  console.log('Find Largest Prime (naive)...');
  const data = findLargestPrime(number);
  if (data > 0) {
    res.setHeader('Cache-control', 'public, max-age=31536000');
    return res.status(200).json({ data });
  }

  return res.status(404).json({
    message: `Not found highest prime number less than ${number}!`,
  });
}
