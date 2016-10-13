/* global $ */

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      interest: 0.05,
      price: {
        D: 400,
        C: 1700,
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

    $.ajax({
      url: `http://l2.valeriivasin.com/crystals`,
      dataType: 'jsonp',
      data: {
        format: 'jsonp',
        items: this.state.inputText,
      },
    }).then(({ results }) => {
      this.setState({ items: results });
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
          <td>{cryAmount} {cryRank}x</td>
          <td>{cryTotal} {cryRank}x</td>
          <td>{priceTotal}</td>
        </tr>
      );
    });

    return (
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
          <td>{price}</td>
          <td>{price * amount}</td>
          <td>{Math.floor((1 - this.state.interest) * amount)}</td>
        </tr>
      );
    });

    return (
      <table className="table">
        <tbody>
          {headers}
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.inputText}
            onChange={this.handleInputChange}
            ref={node => this.input = node}
            />
        </form>

        <div className="overview-table">
          <h1>Overview</h1>
          {this.renderOverviewTable()}
        </div>

        <div className="details-table">
          <h1>Details</h1>
          {this.renderDetailsTable()}
        </div>
      </div>
    );
  }
}

export default App;
