import { getAPIPath } from '../helpers';
import { ActionTypes } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type CliAction = SetLoadingAction | SetCommandAction | SetResultAction | AddHistoryAction;

interface SetLoadingAction extends Action<ActionTypes.CliLoadingSet> {
  payload: { loading: boolean };
}

export const setLoading = (state: boolean): SetLoadingAction => ({
  type: ActionTypes.CliLoadingSet,
  payload: { loading: state },
});

interface SetCommandAction extends Action<ActionTypes.CliCommandSet> {
  payload: { command: string };
}

export const setCommand = (command: string): SetCommandAction => ({
  type: ActionTypes.CliCommandSet,
  payload: { command },
});

interface SetResultAction extends Action<ActionTypes.CliResultSet> {
  payload: { result: string };
}

const setResult = (result: string): SetResultAction => ({
  type: ActionTypes.CliResultSet,
  payload: { result },
});

interface AddHistoryAction extends Action<ActionTypes.CliHistoryAdd> {
  payload: { command: string };
}

const addHistory = (command: string): AddHistoryAction => ({
  type: ActionTypes.CliHistoryAdd,
  payload: { command },
});

type ExecuteHistoryCommandAction = ThunkAction<void, AppState, void, SetCommandAction>;

export const executeHistoryCommand = (command: string): ExecuteHistoryCommandAction => dispatch => {
  dispatch(setCommand(command));
  dispatch(executeCommand());
};

type ExecuteCommandAction = ThunkAction<
  void,
  AppState,
  void,
  SetLoadingAction | SetResultAction | AddHistoryAction
>;

export const executeCommand = (): ExecuteCommandAction => (dispatch, getState) => {
  const { command } = getState().cli;

  dispatch(setLoading(true));

  $.ajax({
    url: getAPIPath('/cli'),
    dataType: 'jsonp',
    data: {
      format: 'jsonp',
      command,
    },
  })
    .then(({ response }) => {
      dispatch(setResult(response));
      dispatch(setLoading(false));
      dispatch(addHistory(command));
    })
    .fail((error: any) => {
      dispatch(setResult(`Error occured: "${error.statusText}"`));
      dispatch(setLoading(false));
    });
};
