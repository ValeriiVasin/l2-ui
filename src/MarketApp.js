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

function medianPrice(prices) {
  if (prices.length === 0) {
    return 'N/A';
  }

  const values = prices.map(price => price.price).sort((a, b) => a - b);
  const midIndex = Math.floor(values.length / 2);

  // non-odd
  if (values.length % 2) {
    return values[midIndex];
  }

  return Math.round((values[midIndex] + values[midIndex - 1]) / 2);
}

const PriceRow = ({ price, amount, time, isHighlighted = false }) => {
  const minsAgo = Math.ceil(
    (Date.now() - new Date(time).getTime()) / (60 * 1000)
  );

  const highlightedStyle = { backgroundColor: 'green', color: 'white' };

  return <tr style={ isHighlighted ? highlightedStyle : {} }>
    <td>{price}</td>
    <td>{amount}</td>
    <td>{minsAgo} min</td>
  </tr>;
};

const PriceTable = ({ prices, limit, type }) => {
  const itemsLimit = limit ? limit : prices.length - 1;
  const itemMedianPrices = medianPrice(prices);

  const rows = prices
    .slice(0, itemsLimit)
    .map((price, index) => {
      const key = `${index}:${price.amount}:${price.price}`;
      const isHighlighted = type === 'sell' ?
                            itemMedianPrices > price.price :
                            itemMedianPrices < price.price;

      return <PriceRow
        key={key}
        price={price.price}
        amount={price.amount}
        time={price.time}
        isHighlighted={isHighlighted}
      />;
    });

  return <table className="table">
    <tbody>{rows}</tbody>
  </table>;
};

/** One item monitoring */
const MonitoringItem = ({ item }) => {
  const sells = item.sell.filter(price => price.fresh).sort((a, b) => a.price - b.price);
  const buys = item.buy.filter(price => price.fresh).sort((a, b) => b.price - a.price);

  const sellsTable = buys.length ?
                    <PriceTable prices={sells} limit={3} type="sell" /> :
                    <h6>No active sellers found</h6>;

  const buysTable = buys.length ?
                    <PriceTable prices={buys} limit={3} type="buy" /> :
                    <h6>No active buyers found</h6>;

  const medianSellPrice = medianPrice(item.sell);
  const medianBuyPrice = medianPrice(item.buy);

  return <div className="row" style={{ marginBottom: 30 }}>
    <div className="row">
      <h4 style={{ display: 'inline-block', marginRight: 10 }}>
        <a href={`http://l2on.net/?c=market&a=item&id=${item.id}`} target="_blank">{item.name}</a>
      </h4>
      <a href={`https://l2central.info/classic/${item.name}`} target="_blank">
        <small>central</small>
      </a>
    </div>

    <div className="row">
      <div className="col-xs-6">Median: {medianSellPrice} ({item.sell.length})</div>
      <div className="col-xs-6">Median: {medianBuyPrice} ({item.buy.length})</div>
    </div>

    <div className="row">
      <div className="col-xs-6">{sellsTable}</div>
      <div className="col-xs-6">{buysTable}</div>
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
    let lsItems;

    try {
      lsItems = JSON.parse(localStorage.getItem('l2onPrices'));
    } catch (e) { /** nothing */ }

    this.setState({ items: lsItems || {} });

    firebase.database().ref('/l2on/currentPrices')
      .on('value', snapshot => {
        const items = snapshot.val();
        this.setState({ items });

        localStorage.setItem('l2onPrices', JSON.stringify(items));
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
