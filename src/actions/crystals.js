import {
  CRYSTALS_PRICE_SET,
  CRYSTALS_INTEREST_SET,
  CRYSTALS_TEXT_SET,
} from './types';

export const setPrice = ({ rank, price }) => ({
  type: CRYSTALS_PRICE_SET,
  payload: { rank, price }
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
