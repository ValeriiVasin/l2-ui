import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import persistState from 'redux-localstorage';

// root containers
import CrystalsApp from './containers/crystals/crystals';
import { MarketContainer } from './containers/market';
import CLIApp from './containers/cli';

import rootReducer from './reducers';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const logger = createLogger();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    persistState(),
  ),
);

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <div className="u-inline-block u-padding">
            <Link to={'/'}>Market</Link>
          </div>
          <div className="u-inline-block u-padding">
            <Link to={'/cry'}>Crystals</Link>
          </div>
          <div className="u-inline-block u-padding">
            <Link to={'/cli'}>CLI</Link>
          </div>
        </div>

        <Provider store={store}>
          <div>
            <Route path="/" exact={true} component={MarketContainer} />
            <Route path="/cli" component={CLIApp} />
            <Route path="/cry" component={CrystalsApp} />
          </div>
        </Provider>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
