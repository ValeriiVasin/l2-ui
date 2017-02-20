import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import CrystalsApp from './containers/crystals/crystals';
import { MarketContainer } from './containers/market';

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

  return (
    <Provider store={store}>
      { isMarket ? <MarketContainer /> : <CrystalsApp />}
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
