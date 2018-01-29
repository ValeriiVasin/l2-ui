import { omit } from 'lodash';

import { MARKET_FILTER_SET, MARKET_ITEM_TOGGLE, MARKET_ITEMS_TOGGLE } from '../actions/types';

const INITIAL_STATE = {
  filter: 'favorites',
  expandedItems: {},
};

export const market = (state = INITIAL_STATE, action) => {
  if (action.type === MARKET_FILTER_SET) {
    return { ...state, filter: action.filter };
  }

  if (action.type === MARKET_ITEM_TOGGLE) {
    const id = action.id;
    const expandedItems = state.expandedItems;
    return expandedItems.hasOwnProperty(id) ?
      { ...state, expandedItems: omit(expandedItems, id) } :
      { ...state, expandedItems: { ...expandedItems, [id]: true } };
  }

  if (action.type === MARKET_ITEMS_TOGGLE) {
    const expandedItems = { ...state.expandedItems };

    action.ids.forEach(id => {
      if (action.value) {
        expandedItems[id] = true;
        return;
      }

      delete expandedItems[id];
    });

    return { ...state, expandedItems };
  }

  return state;
};
