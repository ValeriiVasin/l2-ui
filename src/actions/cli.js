/* global $ */

import {
  CLI_COMMAND_SET,
  CLI_LOADING_SET,
  CLI_RESULT_SET,
} from './types';

export const setLoading = state => ({
  type: CLI_LOADING_SET,
  payload: { loading: state },
});

export const setCommand = command => ({
  type: CLI_COMMAND_SET,
  payload: { command }
});

const setResult = result => ({
  type: CLI_RESULT_SET,
  payload: { result },
});

export const executeCommand = () => (dispatch, getState) => {
  const { command } = getState().cli;

  dispatch(setLoading(true));

  $.ajax({
    url: 'http://l2.valeriivasin.com/cli',
    dataType: 'jsonp',
    data: {
      format: 'jsonp',
      command,
    }
  }).then(({ response }) => {
    dispatch(setResult(response));
    dispatch(setLoading(false));
  });
};
