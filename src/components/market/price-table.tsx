import * as React from 'react';

import { PriceRow } from './price-row';

export const PriceTable = ({ prices, limit, type, median }) => {
  const itemsLimit = limit ? limit : prices.length - 1;

  const rows = prices
    .slice(0, itemsLimit)
    .map((price, index) => {
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
