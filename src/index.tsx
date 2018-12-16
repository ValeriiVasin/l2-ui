import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// root containers
import CLIApp from './containers/cli';
import CrystalsApp from './containers/crystals/crystals';
import { MarketContainer } from './containers/market';

import rootReducer from './reducers';
import './index.css';

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger), persistState(['market', 'cli', 'crystals'])),
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
