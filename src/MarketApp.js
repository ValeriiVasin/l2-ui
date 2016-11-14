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

const PriceRow = ({ price, amount, time }) => <tr>
  <td>{price}</td>
  <td>{amount}</td>
  <td>{new Date(time).toString()}</td>
</tr>;

const PriceTable = ({ prices, limit }) => <table className="table">
  <tbody>
    {
      prices.slice(0, limit ? limit : prices.length - 1).map((price, index) => <PriceRow
        key={`${index}:${price.amount}:${price.price}`}
        price={price.price}
        amount={price.amount}
        time={price.time}
      />)
    }
  </tbody>
</table>;

/** One item monitoring */
const MonitoringItem = ({ item }) => {
  const sells = item.sell.filter(price => price.fresh).sort((a, b) => a.price - b.price);
  const buys = item.buy.filter(price => price.fresh).sort((a, b) => b.price - a.price);

  return <div className="row">
    <h4>
      <a href={`http://l2on.net/?c=market&a=item&id=${item.id}`} target="_blank">{item.name}</a>
    </h4>
    <div className="row">
      <div className="col-xs-6">
        <PriceTable prices={sells} limit={3} />
      </div>
      <div className="col-xs-6">
        <PriceTable prices={buys} limit={3} />
      </div>
    </div>
  </div>;
};

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

    const rows = ids.map(id => <MonitoringItem key={id} item={this.state.items[id]} />);

    return <div className="container">{rows}</div>;
  }
}
