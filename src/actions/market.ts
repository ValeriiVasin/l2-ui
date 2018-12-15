import { MARKET_FILTER_SET, MARKET_ITEM_TOGGLE, MARKET_ITEMS_TOGGLE } from './types';
import { getFilteredItemsIds } from '../reducers/firebase';

export const filterMarket = (filter: L2OnConfigFilterType) => {
  return { type: MARKET_FILTER_SET, filter };
};

export const toggleItem = (id: number) => {
  return { type: MARKET_ITEM_TOGGLE, id };
};

export const toggleItems = (value: boolean) => (dispatch, getState) => {
  const ids = getFilteredItemsIds(getState());
  dispatch({ type: MARKET_ITEMS_TOGGLE, ids, value });
};
