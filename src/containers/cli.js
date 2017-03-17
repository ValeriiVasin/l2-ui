/** CLI App */
import React from 'react';

import { connect } from 'react-redux';

import {
  setCommand,
  executeCommand,
} from './../actions/cli';

const AppComponent = ({ command, loading, result, onChange, onSubmit }) => {
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
        ></textarea>
    </div>
    <div className="u-padding">
      <button>RUN</button>
    </div>
    <pre>{ getResult() }</pre>
  </form>;
};

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
