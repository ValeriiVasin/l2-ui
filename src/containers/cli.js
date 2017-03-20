/** CLI App */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  setCommand,
  executeCommand,
} from './../actions/cli';

class AppComponent extends Component {
  render() {
    const {
      command,
      loading,
      result,
      onChange,
      onSubmit
    } = this.props;

    const handleInputChange = event => {
      event.preventDefault();
      onChange(event.target.value);
    };

    const handleFormSubmit = event => {
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

    return <form onSubmit={handleFormSubmit}>
      <div className="u-padding">
        <textarea
          className="u-block u-full-width"
          value={command}
          onChange={handleInputChange}
          onKeyDown={handleOnKeydown}
          rows={3}
          ref={node => node.focus()}
          ></textarea>

        <div className="u-margin-top u-margin-bottom">
          <button>RUN</button>
        </div>

        <pre>{ getResult() }</pre>
      </div>
    </form>;
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
  mapDispatchToProps
)(AppComponent);
