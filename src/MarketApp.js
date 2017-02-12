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

const PriceTable = ({ prices, limit, type, median }) => {
  const itemsLimit = limit ? limit : prices.length - 1;

  const rows = prices
    .slice(0, itemsLimit)
    .map((price, index) => {
      const key = `${index}:${price.amount}:${price.price}`;
      const isHighlighted = type === 'sell' ? median > price.price : median < price.price;

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
const MonitoringItem = ({ item, basePrice }) => {
  const sells = item.sell.filter(price => price.fresh).sort((a, b) => a.price - b.price);
  const buys = item.buy.filter(price => price.fresh).sort((a, b) => b.price - a.price);

  const medianSellPrice = medianPrice(item.sell);
  const medianBuyPrice = medianPrice(item.buy);

  const sellsTable = buys.length ?
                    <PriceTable prices={sells} limit={3} type="sell" median={medianSellPrice} /> :
                    <h6>No active sellers found</h6>;

  const buysTable = buys.length ?
                    <PriceTable prices={buys} limit={3} type="buy" median={medianBuyPrice} /> :
                    <h6>No active buyers found</h6>;

  const basePriceTitle = `base price: ${basePrice}; sell to shop: ${basePrice * 0.45}`;

  return <div className="row" style={{ marginBottom: 30 }}>
    <div className="row">
      <h4 style={{ display: 'inline-block', marginRight: 10 }}>
        <a href={`http://l2on.net/?c=market&a=item&id=${item.id}`} target="_blank">{item.name}</a>
      </h4>
      <a href={`https://l2central.info/classic/${item.name}`} target="_blank">
        <small>central</small>
      </a>
      <span
        style={{ display: 'inline-block', marginLeft: 10 }}
        title={basePriceTitle}
        >{ basePrice * 0.45 }</span>
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
      items: {},
      basePrices: {}
    };
  }

  componentDidMount() {
    let lsItems;
    let lsBasePrices;

    try {
      lsItems = JSON.parse(localStorage.getItem('l2onPrices'));
      lsBasePrices = JSON.parse(localStorage.getItem('basePrices'));
    } catch (e) { /** nothing */ }

    this.setState({ items: lsItems || {} });
    this.setState({ basePrices: lsBasePrices || {} });

    firebase.database().ref('/l2on/currentPrices')
      .on('value', snapshot => {
        const items = snapshot.val();
        this.setState({ items });

        localStorage.setItem('l2onPrices', JSON.stringify(items));
      });

    firebase.database().ref('/basePrices')
      .on('value', snapshot => {
        const prices = snapshot.val();

        this.setState({ basePrices: prices });
        localStorage.setItem('basePrices', JSON.stringify(prices));
      });
  }

  render() {
    const ids = Object.keys(this.state.items);

    if (!ids.length) {
      return <h1>Hello on l2 market side!</h1>;
    }

    const rows = ids.map(id => {
      const item = this.state.items[id];
      const basePrice = this.state.basePrices[item.name];

      return <MonitoringItem
        key={id}
        item={item}
        basePrice={basePrice}
        />;
    });

    return <div className="container">{rows}</div>;
  }
}
