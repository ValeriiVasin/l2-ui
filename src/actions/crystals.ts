/* global $ */

import { getAPIPath } from '../helpers';
import {
  CRYSTALS_INTEREST_SET,
  CRYSTALS_ITEMS_SET,
  CRYSTALS_LOADING_TOGGLE,
  CRYSTALS_PRICE_SET,
  CRYSTALS_TEXT_SET,
} from './types';

const toggleLoading = value => ({
  type: CRYSTALS_LOADING_TOGGLE,
  payload: { value },
});

export const setPrice = ({ rank, price }) => ({
  type: CRYSTALS_PRICE_SET,
  payload: { rank, price },
});

export const setInterest = ({ interest }) => ({
  type: CRYSTALS_INTEREST_SET,
  payload: { interest },
});

export const setText = text => {
  return {
    type: CRYSTALS_TEXT_SET,
    payload: { text },
  };
};

const setItems = (items: IItemCrystalsInfo[]) => ({
  type: CRYSTALS_ITEMS_SET,
  payload: { items },
});

export const fetchItems = text => dispatch => {
  dispatch(toggleLoading(true));

  $.ajax({
    url: getAPIPath('/crystals'),
    dataType: 'jsonp',
    data: {
      format: 'jsonp',
      items: text.replace(/-{2}/g, ';'),
    },
  }).then(({ results }: { results: IItemCrystalsInfo[] }) => {
    dispatch(setItems(results));
    dispatch(toggleLoading(false));
  });
};
