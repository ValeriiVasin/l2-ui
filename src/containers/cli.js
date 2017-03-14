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
    onChange(event.target.value.trim());
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
  }

  return <form onSubmit={handleFormSubmit}>
    <input
      value={command}
      onChange={handleInputChange}
      />

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
