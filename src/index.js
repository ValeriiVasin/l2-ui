import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { MarketApp } from './MarketApp';
import './index.css';

const store = createStore(state => state);

const Application = ({ store }) => {
  const isMarket = location.hash === '#market';

  return (
    <Provider store={store}>
      { isMarket ? <MarketApp /> : <App /> }
    </Provider>
  );
};

ReactDOM.render(<Application store={store} />, document.getElementById('root'));
