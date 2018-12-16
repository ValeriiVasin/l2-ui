/* global $ */

import { getAPIPath } from '../helpers';
import { ActionTypes } from './types';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type CrystalsActions =
  | ToggleLoadingAction
  | SetPriceAction
  | SetInterestAction
  | SetTextAction
  | SetItemsAction;

interface ToggleLoadingAction extends Action<ActionTypes.CrystalsLoadingToggle> {
  payload: { value: boolean };
}

const toggleLoading = (value: boolean): ToggleLoadingAction => ({
  type: ActionTypes.CrystalsLoadingToggle,
  payload: { value },
});

interface SetPriceAction extends Action<ActionTypes.CrystalsPriceSet> {
  payload: { rank: CrystalRank; price: number };
}

export const setPrice = ({ rank, price }: SetPriceAction['payload']): SetPriceAction => ({
  type: ActionTypes.CrystalsPriceSet,
  payload: { rank, price },
});

interface SetInterestAction extends Action<ActionTypes.CrystalsInterestSet> {
  payload: { interest: number };
}

export const setInterest = ({ interest }: SetInterestAction['payload']): SetInterestAction => ({
  type: ActionTypes.CrystalsInterestSet,
  payload: { interest },
});

interface SetTextAction extends Action<ActionTypes.CrystalsTextSet> {
  payload: { text: string };
}

export const setText = (text: string): SetTextAction => {
  return {
    type: ActionTypes.CrystalsTextSet,
    payload: { text },
  };
};

interface SetItemsAction extends Action<ActionTypes.CrystalsItemsSet> {
  payload: { items: ItemCrystalsInfo[] };
}

const setItems = (items: ItemCrystalsInfo[]): SetItemsAction => ({
  type: ActionTypes.CrystalsItemsSet,
  payload: { items },
});

export const fetchItems = (
  text: string,
): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  dispatch(toggleLoading(true));

  $.ajax({
    url: getAPIPath('/crystals'),
    dataType: 'jsonp',
    data: {
      format: 'jsonp',
      items: text.replace(/-{2}/g, ';'),
    },
  }).then(({ results }: { results: ItemCrystalsInfo[] }) => {
    dispatch(setItems(results));
    dispatch(toggleLoading(false));
  });
};
