import { MARKET_FILTER_SET, MARKET_ITEM_TOGGLE } from './types';

export const filterMarket = (filter: TL2OnConfigFIlterType) => {
  return { type: MARKET_FILTER_SET, filter };
};

export const toggleItem = (id: number) => {
  return { type: MARKET_ITEM_TOGGLE, id };
};
