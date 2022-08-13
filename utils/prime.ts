/**
 * Check whether a number is prime number
 *
 * @param  {number} n A number we want to check
 *
 * @return {boolean} The result
 */
function isPrime(n: number): boolean {
  if (isNotPrime(n)) return false;

  for (let i = 2; i * i <= n; ++i) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

/**
 * Check obvious patterns for non-prime number
 *
 * @param  {number} n A number we want to check
 *
 * @return {boolean} The result
 */
function isNotPrime(n: number): boolean {
  if (n > 5) {
    const lastDigit = n % 10;
    if (lastDigit === 5 || lastDigit % 2 === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Find the highest prime number less than input
 *
 * @param  {number} lessThan A base number we want to find highest prime smaller to
 *
 * @return {number} The result or -1 if not found
 */
function findLargestPrime(lessThan: number): number {
  for (let i = lessThan - 1; i >= 2; i--) {
    if (isPrime(i)) {
      return i;
    }
  }
  return -1;
}

export { isPrime, isNotPrime, findLargestPrime };
