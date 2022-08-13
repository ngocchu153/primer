import { SieveService } from 'services/sieve';

describe('SieveService', () => {
  let testSieve: SieveService;
  beforeAll(() => {
    testSieve = new SieveService(100);
  });

  test('Should return -1 when input is invalid', () => {
    expect(testSieve.findLargestPrime(-1)).toBe(-1);
    expect(testSieve.findLargestPrime(10000)).toBe(-1);
    expect(testSieve.findLargestPrime(NaN)).toBe(-1);
  });

  test('Should return correct result while input in range', () => {
    expect(testSieve.findLargestPrime(55)).toBe(53);
    expect(testSieve.findLargestPrime(4)).toBe(3);
  });
});
