import {
  FIREBASE_LOADED_SET,
  FIREBASE_VALUES_SET,
} from '../actions/types';

const INITIAL_STATE = {
  loaded: false,
  values: null,
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

export const getL2OnPrices = state => {
  if (isLoading(state)) {
    return {};
  }

  return state.firebase.values.l2on.currentPrices;
};

export const getBasePrices = state => {
  if (isLoading(state)) {
    return {};
  }

  return state.firebase.values.basePrices;
};
