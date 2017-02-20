import { combineReducers } from 'redux';

import { firebase } from './firebase';
import { crystals } from './crystals';

export default combineReducers({
  firebase,
  crystals
});
