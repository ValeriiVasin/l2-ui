import React, { SFC } from 'react';
import { getMinutesAgo } from '../../helpers';

export const PriceRow: SFC<{
  price: number;
  amount: number;
  time: Date | number;
  isHighlighted: boolean;
}> = ({ price, amount, time, isHighlighted = false }) => {
  const minsAgo = getMinutesAgo(time);
  const highlightedStyle = { backgroundColor: 'green', color: 'white' };

  return (
    <tr style={isHighlighted ? highlightedStyle : {}}>
      <td>{price}</td>
      <td>{amount}</td>
      <td>{minsAgo} min</td>
    </tr>
  );
};
