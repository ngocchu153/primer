/**
 * Check whether a number is prime number
 *
 * @param  {number} n A number we want to check
 *
 * @return {boolean} The result
 */
function isPrime(n: number): boolean {
  if (isObviouslyNotPrime(n)) return false;

  for (let i = 2; i <= n / i; i++) {
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
function isObviouslyNotPrime(n: number): boolean {
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

/**
 * Find the highest prime number less than input by looking in the pre-built sieve
 *
 * @param  {number} lessThan A base number we want to find highest prime smaller to
 * @param  {Int8Array} sieve A prebuilt array with index is number and value = 1 is prime
 *
 * @return {number} The result or -1 if not found
 */
function findLargestPrimeInSieve(lessThan: number, sieve: Int8Array) {
  if (lessThan > sieve.length || lessThan < 3) {
    return -1;
  }
  for (let i = lessThan - 1; i >= 2; i--) {
    if (isObviouslyNotPrime(i)) continue;
    if (sieve[i] === 1) return i;
  }
  return -1;
}

/**
 * Building Eratosthenes sieve and store in a array
 *
 * @param {number} [limit = 10^6] The size of Eratosthenes sieve
 *
 * @return {Int8Array} Building Eratosthenes sieve array
 */
function buildSieve(limit = 1e6): Int8Array {
  const size = Int8Array.BYTES_PER_ELEMENT * limit;
  const sharedBuffer = new SharedArrayBuffer(size);
  const isPrimeSieve = new Int8Array(sharedBuffer).fill(1);

  isPrimeSieve[0] = 0;
  isPrimeSieve[1] = 0;
  for (let i = 2; i * i <= limit; ++i) {
    if (isPrimeSieve[i] === 1) {
      // Mark all the multiples of i as non-prime numbers
      for (let j = i * i; j <= limit; j += i) {
        isPrimeSieve[j] = 0;
      }
    }
  }
  return isPrimeSieve;
}

export {
  isPrime,
  isObviouslyNotPrime,
  findLargestPrime,
  findLargestPrimeInSieve,
  buildSieve,
};
