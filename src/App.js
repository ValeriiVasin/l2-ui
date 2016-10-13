/* global $ */

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
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

  renderTable = () => {
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

        <div className="crystals-table">
          {this.renderTable()}
        </div>
      </div>
    );
  }
}

export default App;
