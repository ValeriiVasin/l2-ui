import React, { Component } from 'react';

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA7BYqnR5K6rHSF1CuAmOVZ2qpFv4s4J9I',
  authDomain: 'l2-parser.firebaseapp.com',
  databaseURL: 'https://l2-parser.firebaseio.com',
  storageBucket: 'l2-parser.appspot.com',
  messagingSenderId: '267984779420'
};

firebase.initializeApp(config);

export class MarketApp extends Component {
  constructor() {
    super();

    this.state = {
      items: {}
    };
  }

  componentDidMount() {
    firebase.database().ref('/l2on/currentPrices')
      .on('value', snapshot => {
        this.setState({ items: snapshot.val() });
      });
  }

  render() {
    const ids = Object.keys(this.state.items);

    if (!ids.length) {
      return <h1>Hello on l2 market side!</h1>;
    }

    const renderPrices = prices => prices.slice(0, 5).map(price => {
      return <tr className="row" key={`${price.amount}:${price.price}`}>
        <td>{price.price}</td>
        <td>{price.amount}</td>
        <td>{new Date(price.time).toString()}</td>
      </tr>;
    });

    const rows = ids.map(id => {
      const item = this.state.items[id];
      const prices = item.sell.filter(price => price.fresh).sort((a, b) => a.price - b.price);

      return <table key={id} className="table">
        <thead>
          <tr>
            <th colSpan="3">
            <a href={`http://l2on.net/en/?c=market&a=item&id=${id}`} target="_blank">{item.name}</a>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderPrices(prices)}
        </tbody>
      </table>;
    });

    return <div>{rows}</div>;
  }
}
