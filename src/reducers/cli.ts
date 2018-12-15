import * as actions from '../actions/types';
import { uniq } from 'lodash';

const INITIAL_STATE: AppState['cli'] = {
  command: '',
  result: '',
  loading: false,
  history: [],
};

export const cli = (state = INITIAL_STATE, action) => {
  if (action.type === actions.CLI_COMMAND_SET) {
    return { ...state, command: action.payload.command };
  }

  if (action.type === actions.CLI_LOADING_SET) {
    return { ...state, loading: action.payload.loading };
  }

  if (action.type === actions.CLI_RESULT_SET) {
    return { ...state, result: action.payload.result };
  }

  if (action.type === actions.CLI_HISTORY_ADD) {
    return { ...state, history: uniq([action.command, ...state.history]) };
  }

  return state;
};
