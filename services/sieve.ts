import { isObviouslyNotPrime } from 'utils';

export class SieveService {
  private sieve: Array<boolean>;

  constructor(private limit: number) {
    this.sieve = this.buildSieve();
  }

  private buildSieve(): Array<boolean> {
    console.log(`Building Eratosthenes seive, limit = ${this.limit}`);
    const start = performance.now();
    const isPrimeSieve = Array(this.limit).fill(true);
    isPrimeSieve[0] = false;
    isPrimeSieve[1] = false;
    for (let i = 2; i * i <= this.limit; ++i) {
      if (isPrimeSieve[i] === true) {
        // Mark all the multiples of i as non-prime numbers
        for (let j = i * i; j <= this.limit; j += i) {
          isPrimeSieve[j] = false;
        }
      }
    }
    const timeTaken = performance.now() - start;
    console.log(`Done building. Took ${timeTaken} milisec`);
    return isPrimeSieve;
  }

  /**
   * Find the highest prime number less than input by looking in the pre-built seive
   *
   * @param  {number} lessThan A base number we want to find highest prime smaller to
   *
   * @return {number} The result or -1 if not found
   */
  findLargestPrime(lessThan: number) {
    if (lessThan > this.limit || lessThan < 3) {
      return -1;
    }
    for (let i = lessThan; i >= 2; i--) {
      if (isObviouslyNotPrime(i)) continue;
      if (this.sieve[i] === true) return i;
    }
    return -1;
  }
}
