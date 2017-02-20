import {
  CRYSTALS_PRICE_SET,
} from './types';

export const setPrice = ({ rank, price }) => ({
  type: CRYSTALS_PRICE_SET,
  payload: { rank, price }
});
