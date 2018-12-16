import { omit } from 'lodash';
import { Reducer } from 'redux';

import { ActionTypes } from '../actions/types';
import { MarketActions } from '../actions/market';

const INITIAL_STATE: AppState['market'] = {
  filter: 'favorites',
  expandedItems: {},
};

export const market: Reducer<AppState['market'], MarketActions> = (
  state = INITIAL_STATE,
  action,
) => {
  if (action.type === ActionTypes.MarketFilterSet) {
    return { ...state, filter: action.filter };
  }

  if (action.type === ActionTypes.MarketItemToggle) {
    const id = action.id;
    const expandedItems = state.expandedItems;
    return expandedItems.hasOwnProperty(id)
      ? { ...state, expandedItems: omit(expandedItems, id) }
      : { ...state, expandedItems: { ...expandedItems, [id]: true } };
  }

  if (action.type === ActionTypes.MarketItemsToggle) {
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
