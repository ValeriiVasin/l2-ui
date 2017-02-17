import * as firebase from 'firebase';

import {
  MARKET_ITEMS_SET,
  MARKET_BASE_PRICES_SET
} from './types';

export function setBasePrices(basePrices) {
  return {
    type: MARKET_BASE_PRICES_SET,
    prices: basePrices
  };
}

export function setMarketItems(items) {
  return {
    type: MARKET_ITEMS_SET,
    items: items
  };
}

export const connectToFirebase = () => (dispatch, getState) => {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyA7BYqnR5K6rHSF1CuAmOVZ2qpFv4s4J9I',
    authDomain: 'l2-parser.firebaseapp.com',
    databaseURL: 'https://l2-parser.firebaseio.com',
    storageBucket: 'l2-parser.appspot.com',
    messagingSenderId: '267984779420'
  };

  firebase.initializeApp(config);

  firebase.database().ref('/l2on/currentPrices')
    .on('value', snapshot => {
      const items = snapshot.val();

      dispatch(setMarketItems(items));
      // localStorage.setItem('l2onPrices', JSON.stringify(items));
    });

  firebase.database().ref('/basePrices')
    .on('value', snapshot => {
      const prices = snapshot.val();

      dispatch(setBasePrices(prices));
      // this.setState({ basePrices: prices });
      // localStorage.setItem('basePrices', JSON.stringify(prices));
    });
};
