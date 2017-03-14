import { combineReducers } from 'redux';

import { firebase } from './firebase';
import { crystals } from './crystals';
import { cli } from './cli';

export default combineReducers({
  firebase,
  crystals,
  cli
});
