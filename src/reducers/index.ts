import { combineReducers } from 'redux';

import { cli } from './cli';
import { crystals } from './crystals';
import { firebase } from './firebase';

export default combineReducers({
  firebase,
  crystals,
  cli,
});
