/* global $ */

import React, { Component } from 'react';
import './App.css';

function priceToString(price) {
  const str = price.toString();
  let result = '';

  for (let i = str.length - 1, count = 0; i >= 0; i--) {

    if (count === 3) {
      result += ' ';
      count = 0;
    }

    result += str.charAt(i);

    count += 1;
  }

  return result.split('').reverse().join('').trim();
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      interest: 0.05,
      price: {
        D: 400,
        C: 1600,
      },
      inputText: '',
      items: [],
    };
  }

  handleInputChange = event => {
    this.setState({ inputText: event.target.value });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    $.ajax({
      url: `http://l2.valeriivasin.com/crystals`,
      dataType: 'jsonp',
      data: {
        format: 'jsonp',
        items: this.state.inputText,
      },
    }).then(({ results }) => {
      this.setState({ items: results });
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.input.focus();
  }

  renderDetailsTable = () => {
    if (this.state.items.length === 0) {
      return null;
    }

    const rows = this.state.items.map(item => {
      const cryRank = item.crystals.rank;
      const cryAmount = item.crystals.amount;
      const cryPrice = this.state.price[cryRank];

      const name = item.name;
      const amount = item.amount;

      const cryTotal = cryAmount * amount;
      const priceTotal = cryPrice * cryTotal;

      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{amount}</td>
          <td>{cryRank}x {cryAmount}</td>
          <td>{cryRank}x {cryTotal}</td>
          <td>{priceToString(priceTotal)}</td>
        </tr>
      );
    });

    return (
      <div key='details'>
        <h1>Details</h1>
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>cry pre item</th>
              <th>cry total</th>
              <th>Price (total)</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

  renderOverviewTable() {
    const items = this.state.items;

    if (items.length === 0) {
      return null;
    }

    const results = items.reduce((acc, item) => {
      const itemsAmount = item.amount;
      const cryAmount = item.crystals.amount;
      const cryRank = item.crystals.rank;

      const cryTotal = cryAmount * itemsAmount;
      acc[cryRank] = (acc[cryRank] || 0) + cryTotal;

      return acc;
    }, {});

    const availableRanks = Object.keys(results).sort();

    const headers = (
      <tr>
        <th>cry</th>
        <th>amount</th>
        <th>price per cry</th>
        <th>price total</th>
        <th>return back</th>
      </tr>
    );

    const rows = availableRanks.map(rank => {
      const amount = results[rank];
      const price = this.state.price[rank];

      return (
        <tr key={rank}>
          <td>{rank}x</td>
          <td>{amount}</td>
          <td>{priceToString(price)}</td>
          <td>{priceToString(price * amount)}</td>
          <td>{priceToString(Math.floor((1 - this.state.interest) * amount))}</td>
        </tr>
      );
    });

    const getStatusString = results => {
      let totalPrice = 0;
      let totalReturn = '';

      const availableRanks = Object.keys(results);

      availableRanks.forEach(rank => {
        const rankPrice = this.state.price[rank];
        const rankAmount = results[rank];
        const returnAmount = Math.floor(rankAmount * (1 - this.state.interest));

        totalPrice += rankPrice * rankAmount;
        totalReturn += ` ${rank}x - ${returnAmount};`;
      });

      return <div>
        <h5>Total price: {priceToString(totalPrice)}</h5>
        <h5>Total return: {totalReturn.trim()}</h5>
      </div>
    };

    return (
      <div key='overview'>
        <h1>Overview Table</h1>
        {getStatusString(results)}
        <table className="table">
          <tbody>
            {headers}
            {rows}
          </tbody>
        </table>
      </div>
    );
  }


  render() {
    const appContent = this.state.loading ? (<h1>Loading...</h1>) : [
      this.renderOverviewTable(),
      this.renderDetailsTable(),
    ];

    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.inputText}
            onChange={this.handleInputChange}
            ref={node => this.input = node}
            className="form-control"
            />
        </form>

        {appContent}
      </div>
    );
  }
}

export default App;
