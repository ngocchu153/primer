/**
 * Check whether a number is prime number
 *
 * @param  {number} n       A number we want to check
 *
 * @return {boolean}        The result
 */
export default function isPrime(n: number): boolean {
  for (let i = 2; i * i <= n; ++i) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}
