import { ActionTypes } from './types';
import { getFilteredItemsIds } from '../reducers/firebase';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type MarketActions =
  | FilterMarketAction
  | ToggleMarketItemAction
  | ToggleMarketItemsActions
  | ToggleMarketActiveOnlyAction;
export type MarketAsyncActions = ToggleMarketItemsAsyncAction;

interface FilterMarketAction extends Action<ActionTypes.MarketFilterSet> {
  filter: L2OnConfigFilterType;
}

export const filterMarket = (filter: L2OnConfigFilterType): FilterMarketAction => {
  return { type: ActionTypes.MarketFilterSet, filter };
};

interface ToggleMarketItemAction extends Action<ActionTypes.MarketItemToggle> {
  id: number;
}

export const toggleItem = (id: number): ToggleMarketItemAction => {
  return { type: ActionTypes.MarketItemToggle, id };
};

interface ToggleMarketActiveOnlyAction extends Action<ActionTypes.MarketToggleActiveOnly> {
  payload: { active: boolean };
}
export const toggleActive = (active: boolean): ToggleMarketActiveOnlyAction => ({
  type: ActionTypes.MarketToggleActiveOnly,
  payload: { active },
});

interface ToggleMarketItemsActions extends Action<ActionTypes.MarketItemsToggle> {
  ids: number[];
  value: boolean;
}

// TODO: replace with sync action
type ToggleMarketItemsAsyncAction = ThunkAction<void, AppState, void, ToggleMarketItemsActions>;

export const toggleItems = (value: boolean): ToggleMarketItemsAsyncAction => (
  dispatch,
  getState,
) => {
  const ids = getFilteredItemsIds(getState());
  dispatch({ type: ActionTypes.MarketItemsToggle, ids, value });
};
