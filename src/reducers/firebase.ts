import { pickBy } from 'lodash';
import { medianPrice } from '../helpers';

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

// selectors
export const isLoading = state => {
  return !state.firebase.loaded;
};

export const getL2OnPrices = (state: IAppState): IL2OnCurrentPricesList => {
  return state.firebase.values.l2on.currentPrices;
};

const getL2OnConfig = (state: IAppState): IL2OnConfigItem[] => {
  return state.firebase.values.config.l2on;
};

const getFilteredItems = (state: IAppState): IL2OnConfigItem[] => {
  const config = getL2OnConfig(state);
  const filter = state.market.filter;

  if (filter === 'all') {
    return config;
  }

  if (filter === 'favorites') {
    return config.filter(item => item.favorite);
  }

  return config.filter(item => item.type === filter);
};

const getFilteredItemNames = (state: IAppState): string[] =>
  getFilteredItems(state).map(item => item.name);

export const getFilteredItemsIds = (state: IAppState): number[] =>
  getFilteredItems(state).map(item => item.l2onId);

export const getFilteredL2OnPrices = (state: IAppState) => {
  const prices: IL2OnCurrentPricesList = getL2OnPrices(state);
  const names = getFilteredItemNames(state);

  return pickBy(prices, (price: IL2OnCurrentPrices) => names.indexOf(price.name) !== -1);
};

export const getBasePrices = state => {
  if (isLoading(state)) {
    return {};
  }

  return state.firebase.values.basePrices;
};

export const getL2OnItemIdByName = (state: IAppState, name: string): number => {
  if (isLoading(state)) {
    return -1;
  }

  const item: IL2OnConfigItem | undefined = state.firebase.values.config.l2on.find(_ => _.name === name);

  if (!item) {
    throw new Error(`Can not find l2on item with name "${name}". Please double check item name you passing.`);
  }

  return item.l2onId;
};

type TPriceType = 'buy' | 'sell';
export const getMedianPrice = (state: IAppState, name: string, type: TPriceType) => {
  if (isLoading(state)) {
    return 0;
  }

  const id: number = getL2OnItemIdByName(state, name);
  const item: IL2OnCurrentPrices = state.firebase.values.l2on.currentPrices[id];
  const prices: IL2OnCurrentPrice[] = type === 'sell' ? item.sell : item.buy;

  return prices ? medianPrice(prices) : 0;
};
