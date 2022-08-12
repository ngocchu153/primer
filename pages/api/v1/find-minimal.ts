import type { NextApiRequest, NextApiResponse } from "next";
import { isPrime } from "utils";

export type MinimalData = {
  result?: number;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MinimalData>
) {
  const { inputNumber } = req.query;
  const number = parseInt(inputNumber as string, 10);

  if (!number) {
    res.status(400).json({ message: "invalid input" });
  }

  if (!number || !isFinite(number) || number < 2 || number > 9007199254740991) {
    res.status(400).json({
      message: "This program only support input from 2 to 9007199254740991",
    });
  }

  for (let i = number; i >= 2; i--) {
    if (isPrime(i)) {
      return res.status(200).json({ result: i });
    }
  }

  res.status(500).json({ message: "unhandled error" });
}
