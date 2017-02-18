import {
  MARKET_ITEMS_SET,
  MARKET_BASE_PRICES_SET
} from './types';

export function setBasePrices(basePrices) {
  return {
    type: MARKET_BASE_PRICES_SET,
    prices: basePrices
  };
}

export function setMarketItems(items) {
  return {
    type: MARKET_ITEMS_SET,
    items: items
  };
}
