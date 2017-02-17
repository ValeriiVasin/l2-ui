import { combineReducers } from 'redux';

import {
  MARKET_ITEMS_SET,
  MARKET_BASE_PRICES_SET
} from '../actions/types';

const basePrices = (state = {}, action) => {
  if (action.type === MARKET_BASE_PRICES_SET) {
    return action.prices;
  }

  return state;
};

const items = (state = [], action) => {
  if (action.type === MARKET_ITEMS_SET) {
    return action.items;
  }

  return state;
};

export const market = combineReducers({
  basePrices,
  items,
});
