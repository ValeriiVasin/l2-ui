import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import CrystalsApp from './containers/crystals/crystals';
import { MarketContainer } from './containers/market';

import CLIApp from './containers/cli';

import rootReducer from './reducers';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

const App = () => {
  const isMarket = location.hash === '#market';
  const isCLI = location.hash === '#cli';

  const renderApp = () => {
    if (isMarket) {
      return <MarketContainer />;
    }

    if (isCLI) {
      return <CLIApp />;
    }

    return <CrystalsApp />
  }

  return (
    <Provider store={store}>
      {renderApp()}
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
