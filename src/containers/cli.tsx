/** CLI App */
import * as React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

import {
  executeCommand,
  setCommand,
} from './../actions/cli';

interface IAppCliProps {
  command: string;
  loading: boolean;
  result: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

class AppComponent extends Component<IAppCliProps, any> {
  private textarea: HTMLElement;

  public componentDidMount() {
    this.textarea.focus();
  }

  public render() {
    const {
      command,
      loading,
      result,
      onChange,
      onSubmit,
    } = this.props;

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
            ref={node => this.textarea = node}
          />

          <div className="u-margin-top u-margin-bottom">
            <button>RUN</button>
          </div>

          <pre>{ getResult() }</pre>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const {
    command,
    result,
    loading,
   } = state.cli;

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
