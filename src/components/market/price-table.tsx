import React, { SFC } from 'react';

import { PriceRow } from './price-row';

export const PriceTable: SFC<{
  limit: number;
  prices: L2OnCurrentPrice[];
  type: 'sell' | 'buy';
  median: number | 'N/A';
}> = ({ prices, limit, type, median }) => {
  const itemsLimit = limit ? limit : prices.length;

  const rows = prices.slice(0, itemsLimit).map((price, index) => {
    const key = `${index}:${price.amount}:${price.price}`;
    const isHighlighted = type === 'sell' ? median > price.price : median < price.price;

    return (
      <PriceRow
        key={key}
        price={price.price}
        amount={price.amount}
        time={price.time}
        isHighlighted={isHighlighted}
      />
    );
  });

  return (
    <table className="table">
      <tbody>{rows}</tbody>
    </table>
  );
};
