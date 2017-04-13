import {
  CRYSTALS_INTEREST_SET,
  CRYSTALS_ITEMS_SET,
  CRYSTALS_LOADING_TOGGLE,
  CRYSTALS_PRICE_SET,
  CRYSTALS_TEXT_SET,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  interest: 5,
  price: {
    D: 400,
    C: 1600,
    B: 3800,
  },
  text: '',
  items: [],
};

export const crystals = (state = INITIAL_STATE, action) => {
  if (action.type === CRYSTALS_ITEMS_SET) {
    return { ...state, items: action.payload.items };
  }

  if (action.type === CRYSTALS_LOADING_TOGGLE) {
    return { ...state, loading: action.payload.value };
  }

  if (action.type === CRYSTALS_TEXT_SET) {
    return { ...state, text: action.payload.text };
  }

  if (action.type === CRYSTALS_INTEREST_SET) {
    return { ...state, interest: action.payload.interest };
  }

  if (action.type === CRYSTALS_PRICE_SET) {
    return {
      ...state,
      price: { ...state.price, [action.payload.rank]: action.payload.price },
    };
  }

  return state;
};
