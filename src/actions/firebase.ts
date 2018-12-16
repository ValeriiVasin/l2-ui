import firebase from 'firebase';
import { once } from 'lodash';

import { ActionTypes } from './types';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type FirebaseActions = SetValuesAction | SetLoadedAction;

const connect = once(() => {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyA7BYqnR5K6rHSF1CuAmOVZ2qpFv4s4J9I',
    authDomain: 'l2-parser.firebaseapp.com',
    databaseURL: 'https://l2-parser.firebaseio.com',
    storageBucket: 'l2-parser.appspot.com',
    messagingSenderId: '267984779420',
  };

  firebase.initializeApp(config);
});

interface SetValuesAction extends Action<ActionTypes.FirebaseValuesSet> {
  values: AppState['firebase']['values'];
}

const setFirebaseValues = (values: AppState['firebase']['values']): SetValuesAction => {
  return {
    type: ActionTypes.FirebaseValuesSet,
    values,
  };
};

interface SetLoadedAction extends Action<ActionTypes.FirebaseLoadedSet> {}

const setLoaded = (): SetLoadedAction => ({ type: ActionTypes.FirebaseLoadedSet });

export const connectToFirebase = (): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  connect();

  firebase
    .database()
    .ref('/')
    .on('value', snapshot => {
      if (!snapshot) {
        return;
      }

      dispatch(setFirebaseValues(snapshot.val()));
      dispatch(setLoaded());
    });
};
