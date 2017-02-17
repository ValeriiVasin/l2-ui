import React from 'react';

export const PriceRow = ({ price, amount, time, isHighlighted = false }) => {
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
