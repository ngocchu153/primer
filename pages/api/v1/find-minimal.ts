import type { NextApiRequest, NextApiResponse } from 'next';
import { isPrime } from 'utils';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<models.ApiResponse<number>>
) {
  const { inputNumber } = req.query;
  const number = parseInt(inputNumber as string, 10);

  if (!number || !isFinite(number) || number < 2 || number > 9007199254740991) {
    return res.status(400).json({
      statusCode: 400,
      message: 'This program only support input from 2 to 9007199254740991',
    });
  }

  for (let i = number; i >= 2; i--) {
    if (isPrime(i)) {
      return res.status(200).json({ data: i, statusCode: 200 });
    }
  }

  return res
    .status(500)
    .json({ message: 'Internal Server Error!', statusCode: 500 });
}
