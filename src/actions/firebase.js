import * as firebase from 'firebase';

import {
  FIREBASE_VALUES_SET,
  FIREBASE_LOADED_SET
} from './types';

const connect = () => {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyA7BYqnR5K6rHSF1CuAmOVZ2qpFv4s4J9I',
    authDomain: 'l2-parser.firebaseapp.com',
    databaseURL: 'https://l2-parser.firebaseio.com',
    storageBucket: 'l2-parser.appspot.com',
    messagingSenderId: '267984779420'
  };

  firebase.initializeApp(config);
};

const setFirebaseValues = values => {
  return {
    type: FIREBASE_VALUES_SET,
    values
  };
};

const setLoaded = () => ({ type: FIREBASE_LOADED_SET });

export const connectToFirebase = () => dispatch => {
  connect();

  firebase.database().ref('/')
    .on('value', snapshot => {
      dispatch(setFirebaseValues(snapshot.val()));
      dispatch(setLoaded());
    });
};
