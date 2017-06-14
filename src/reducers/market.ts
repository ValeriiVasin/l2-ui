import { MARKET_FILTER_SET } from '../actions/types';

const INITIAL_STATE = {
  filter: 'favorites',
};

export const market = (state = INITIAL_STATE, action) => {
  if (action.type === MARKET_FILTER_SET) {
    return { ...state, filter: action.filter };
  }

  return state;
};
