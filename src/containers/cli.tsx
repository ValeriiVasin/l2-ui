import React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

import { executeCommand, setCommand, executeHistoryCommand } from './../actions/cli';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface AppCliProps {
  command: string;
  loading: boolean;
  result: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const HistoryItemComponent = ({ command, onClick }) => (
  <div>
    <a href="javascript:void(0)" key={command} onClick={() => onClick(command)}>
      {command}
    </a>
  </div>
);

const HistoryComponent = ({ history, onItemClick }) => {
  if (history.length === 0) {
    return null;
  }

  const commands = history.map(command => (
    <HistoryItemComponent key={command} command={command} onClick={() => onItemClick(command)} />
  ));

  return (
    <div className="u-magin-top">
      <h1>History</h1>
      {commands}
    </div>
  );
};

const HistoryContainer = connect(
  (state: AppState) => ({ history: state.cli.history }),
  (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
    onItemClick: command => dispatch(executeHistoryCommand(command)),
  }),
)(HistoryComponent);

class AppComponent extends Component<AppCliProps, any> {
  private textareaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

  public componentDidMount() {
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
  }

  public render() {
    const { command, loading, result, onChange, onSubmit } = this.props;

    const handleInputChange = (event: any) => {
      event.preventDefault();
      onChange(event.target.value);
    };

    const handleFormSubmit = (event: any) => {
      event.preventDefault();
      onSubmit();
    };

    const getResult = () => {
      if (loading) {
        return 'Loading...';
      }

      if (result) {
        return result;
      }

      return 'Start typing the command...';
    };

    const handleOnKeydown = event => {
      const isMetaOrCtrlKey = event.metaKey || event.ctrlKey;
      const isEnterKey = event.which === 13;

      if (isMetaOrCtrlKey && isEnterKey) {
        onSubmit();
      }
    };

    return (
      <form onSubmit={handleFormSubmit}>
        <div className="u-padding">
          <textarea
            className="u-block u-full-width"
            value={command}
            onChange={handleInputChange}
            onKeyDown={handleOnKeydown}
            rows={3}
            ref={this.textareaRef}
          />

          <div className="u-margin-top u-margin-bottom clearfix">
            <button className="pull-left">RUN</button>
            <button className="pull-right" onClick={this.handleClearButtonClick}>
              CLEAR
            </button>
          </div>

          <pre>{getResult()}</pre>

          <HistoryContainer />
        </div>
      </form>
    );
  }

  private handleClearButtonClick = event => {
    event.preventDefault();
    this.props.onChange('');
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
  };
}

const mapStateToProps = state => {
  const { command, result, loading } = state.cli;

  return {
    command,
    result,
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: value => dispatch(setCommand(value)),
    onSubmit: () => dispatch(executeCommand()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
