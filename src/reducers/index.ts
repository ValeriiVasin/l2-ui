import { combineReducers } from 'redux';

import { cli } from './cli';
import { crystals } from './crystals';
import { firebase } from './firebase';
import { market } from './market';

export default combineReducers<AppState>({
  firebase,
  crystals,
  cli,
  market,
});
