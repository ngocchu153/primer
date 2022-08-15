import {
  isPrime,
  isObviouslyNotPrime,
  findLargestPrime,
  buildSieve,
  findLargestPrimeInSieve,
} from 'utils/prime';

describe('Prime Utils', () => {
  test('Should check obvious not prime number properly', () => {
    expect(isObviouslyNotPrime(-1)).toBe(false);
    expect(isObviouslyNotPrime(27)).toBe(false);
  });

  test('Should return the correct prime properly', () => {
    expect(isPrime(1)).toBe(true);
    expect(isPrime(53)).toBe(true);
    expect(isPrime(27)).toBe(false);
    expect(isPrime(97)).toBe(true);
  });

  test('Should find the correct largest prime smaller than input ', () => {
    expect(findLargestPrime(55)).toBe(53);
    expect(findLargestPrime(2)).toBe(-1);
  });

  test('Should build correct sieve', () => {
    const sieve = buildSieve(100);

    expect(sieve.length === 100);
    expect(sieve[0] === 0);
    expect(sieve[2] === 1);
    expect(sieve[55] === 0);
    expect(sieve[53] === 1);
  });

  test('Should return -1 when input is invalid', () => {
    const sieve = new Int8Array();

    expect(findLargestPrimeInSieve(-1, sieve)).toBe(-1);
    expect(findLargestPrimeInSieve(10000, sieve)).toBe(-1);
    expect(findLargestPrimeInSieve(NaN, sieve)).toBe(-1);
  });

  test('Should return correct result while input in range', () => {
    const sieve = buildSieve(100);

    expect(findLargestPrimeInSieve(2, sieve)).toBe(-1);
    expect(findLargestPrimeInSieve(55, sieve)).toBe(53);
  });
});
