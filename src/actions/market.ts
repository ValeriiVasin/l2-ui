import { MARKET_FILTER_SET } from './types';

export const filterMarket = (filter: TL2OnConfigFIlterType) => {
  return { type: MARKET_FILTER_SET, filter };
};
