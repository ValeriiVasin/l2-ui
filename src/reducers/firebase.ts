import { pickBy } from 'lodash';

import {
  FIREBASE_LOADED_SET,
  FIREBASE_VALUES_SET,
} from '../actions/types';

const INITIAL_STATE = {
  loaded: false,
  values: {
    l2on: {
      currentPrices: {},
    },
    config: {
      l2on: [],
    },
    updates: {
      l2on: '',
    },
  },
};

export const firebase = (state = INITIAL_STATE, action) => {
  if (action.type === FIREBASE_VALUES_SET) {
    return { ...state, values: action.values };
  }

  if (action.type === FIREBASE_LOADED_SET) {
    return { ...state, loaded: true };
  }

  return state;
};

// getters
export const isLoading = state => {
  return !state.firebase.loaded;
};

export const getL2OnPrices = (state: IAppState): IL2OnCurrentPricesList => {
  return state.firebase.values.l2on.currentPrices;
};

const getL2OnConfig = (state: IAppState): IL2OnConfigItem[] => {
  return state.firebase.values.config.l2on;
};

const getFilteredItems = (state: IAppState, filter: TL2OnConfigFIlterType): string[] => {
  const config = getL2OnConfig(state);

  if (filter === 'all') {
    return config.map(item => item.name);
  }

  if (filter === 'favorites') {
    return config.filter(item => item.favorite).map(item => item.name);
  }

  return config.filter(item => item.type === filter).map(item => item.name);
};

export const getFilteredL2OnPrices = (state: IAppState) => {
  const prices: IL2OnCurrentPricesList = getL2OnPrices(state);
  const filter = state.market.filter;
  const items = getFilteredItems(state, filter);

  return pickBy(prices, (price: IL2OnCurrentPrices) => items.indexOf(price.name) !== -1);
};

export const getBasePrices = state => {
  if (isLoading(state)) {
    return {};
  }

  return state.firebase.values.basePrices;
};
