import {
  CLI_COMMAND_SET,
  CLI_LOADING_SET,
  CLI_RESULT_SET,
} from '../actions/types';

const INITIAL_STATE = {
  command: '',
  result: '',
  loading: false,
};

export const cli = (state = INITIAL_STATE, action) => {
  if (action.type === CLI_COMMAND_SET) {
    return { ...state, command: action.payload.command };
  }

  if (action.type === CLI_LOADING_SET) {
    return { ...state, loading: action.payload.loading };
  }

  if (action.type === CLI_RESULT_SET) {
    return { ...state, result: action.payload.result };
  }

  return state;
}
