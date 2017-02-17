import React from 'react';

import { PriceTable } from './price-table';
import { medianPrice } from '../../helpers';

export const MonitoringItem = ({ item, basePrice }) => {
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

  const sellToShopPrice = basePrice ? basePrice * 0.5 * 0.9 : 0;
  const basePriceTitle = `base price: ${basePrice}; sell to shop: ${sellToShopPrice}`;

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
        >{sellToShopPrice}</span>
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
