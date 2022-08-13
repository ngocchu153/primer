import { isPrime, isObviouslyNotPrime, findLargestPrime } from 'utils/prime';

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
});
