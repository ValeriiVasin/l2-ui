import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MarketApp } from './MarketApp';
import './index.css';

ReactDOM.render(
  location.hash === '#market' ? <MarketApp /> : <App />,
  document.getElementById('root')
);
