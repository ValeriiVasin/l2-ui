import React, { Component } from 'react';
import { MonitoringItem } from './monitoring-item';

export class Market extends Component {
  componentDidMount() {
    this.props.connectToFirebase();
  }

  render() {
    const {
      items,
      basePrices
    } = this.props;

    const ids = Object.keys(items);

    if (ids.length === 0) {
      return <h1>Loading...</h1>;
    }

    const rows = ids.map(id => {
      const item = items[id];
      const basePrice = basePrices[item.name];

      return <MonitoringItem
        key={id}
        item={item}
        basePrice={basePrice}
        />;
    });

    return <div className="container">{rows}</div>;
  }
}
