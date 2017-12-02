import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import * as persistState from 'redux-localstorage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// root containers
import CLIApp from './containers/cli';
import CrystalsApp from './containers/crystals/crystals';
import { MarketContainer } from './containers/market';

import rootReducer from './reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, logger),
    persistState(),
  ),
);

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <div className='u-inline-block u-padding'>
            <Link to={'/'}>Market</Link>
          </div>
          <div className='u-inline-block u-padding'>
            <Link to={'/cry'}>Crystals</Link>
          </div>
          <div className='u-inline-block u-padding'>
            <Link to={'/cli'}>CLI</Link>
          </div>
        </div>

        <Provider store={store}>
          <div>
            <Route path='/' exact={true} component={MarketContainer as any} />
            <Route path='/cli' component={CLIApp as any} />
            <Route path='/cry' component={CrystalsApp as any} />
          </div>
        </Provider>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
