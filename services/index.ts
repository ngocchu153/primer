import { SIEVE_LIMIT } from 'consts';
import { SieveService } from './sieve';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var sieveService: SieveService;
}

export const sieveService =
  global.sieveService || new SieveService(SIEVE_LIMIT);

if (process.env.NODE_ENV !== 'production') global.sieveService = sieveService;
