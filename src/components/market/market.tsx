import * as React from 'react';
import { Component } from 'react';
import { MonitoringItem } from './monitoring-item';

export class Market extends Component<any, any> {
  public componentDidMount() {
    this.props.connectToFirebase();
  }

  public render() {
    const {
      items,
      basePrices,
      loading,
    } = this.props;

    if (loading) {
      return (
        <div className="u-padding">
          <h1>Loading...</h1>
        </div>
      );
    }

    const ids = Object.keys(items);

    const rows = ids.map(id => {
      const item = items[id];
      const basePrice = basePrices[item.name];

      return (
        <MonitoringItem
          key={id}
          item={item}
          basePrice={basePrice}
        />
      );
    });

    return <div className="container u-padding">{rows}</div>;
  }
}