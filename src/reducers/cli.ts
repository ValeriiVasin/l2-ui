import { uniq } from 'lodash';
import { CliAction } from '../actions/cli';
import { ActionTypes } from '../actions/types';
import { Reducer } from 'redux';

const INITIAL_STATE: AppState['cli'] = {
  command: '',
  result: '',
  loading: false,
  history: [],
};

export const cli: Reducer<AppState['cli'], CliAction> = (state = INITIAL_STATE, action) => {
  if (action.type === ActionTypes.CliCommandSet) {
    return { ...state, command: action.payload.command };
  }

  if (action.type === ActionTypes.CliLoadingSet) {
    return { ...state, loading: action.payload.loading };
  }

  if (action.type === ActionTypes.CliResultSet) {
    return { ...state, result: action.payload.result };
  }

  if (action.type === ActionTypes.CliHistoryAdd) {
    return { ...state, history: uniq([action.payload.command, ...state.history]) };
  }

  return state;
};
