import { getAPIPath } from '../helpers';
import * as actions from './types';

export const setLoading = state => ({
  type: actions.CLI_LOADING_SET,
  payload: { loading: state },
});

export const setCommand = command => ({
  type: actions.CLI_COMMAND_SET,
  payload: { command },
});

const setResult = result => ({
  type: actions.CLI_RESULT_SET,
  payload: { result },
});

const addHistory = (command: string) => ({
  type: actions.CLI_HISTORY_ADD,
  command,
});

export const executeHistoryCommand = (command: string) => dispatch => {
  dispatch(setCommand(command));
  dispatch(executeCommand());
};

export const executeCommand = () => (dispatch, getState) => {
  const { command } = getState().cli;

  dispatch(setLoading(true));

  $.ajax({
    url: getAPIPath('/cli'),
    dataType: 'jsonp',
    data: {
      format: 'jsonp',
      command,
    },
  }).then(({ response }) => {
    dispatch(setResult(response));
    dispatch(setLoading(false));
    dispatch(addHistory(command));
  }).fail((error: any) => {
    dispatch(setResult(`Error occured: "${error.statusText}"`));
    dispatch(setLoading(false));
  });
};
