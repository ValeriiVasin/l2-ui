import { ActionTypes } from '../actions/types';
import { Reducer } from 'redux';
import { CrystalsActions } from '../actions/crystals';

const INITIAL_STATE: AppState['crystals'] = {
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

export const crystals: Reducer<AppState['crystals'], CrystalsActions> = (
  state = INITIAL_STATE,
  action,
) => {
  if (action.type === ActionTypes.CrystalsItemsSet) {
    return { ...state, items: action.payload.items };
  }

  if (action.type === ActionTypes.CrystalsLoadingToggle) {
    return { ...state, loading: action.payload.value };
  }

  if (action.type === ActionTypes.CrystalsTextSet) {
    return { ...state, text: action.payload.text };
  }

  if (action.type === ActionTypes.CrystalsInterestSet) {
    return { ...state, interest: action.payload.interest };
  }

  if (action.type === ActionTypes.CrystalsPriceSet) {
    return {
      ...state,
      price: { ...state.price, [action.payload.rank]: action.payload.price },
    };
  }

  return state;
};
