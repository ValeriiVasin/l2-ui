import React, { SFC } from 'react';

import { interestAmount, priceToString } from '../../helpers';

export interface StateProps {
  prices: AppState['crystals']['price'];
  items: ItemCrystalsInfo[];
  interest: number;
}

const Status: SFC<{
  results: CryDictionary;
  prices: AppState['crystals']['price'];
  interest: number;
}> = ({ results, prices, interest }) => {
  let totalPrice = 0;
  let totalReturn = '';

  const availableRanks = Object.keys(results) as CrystalRank[];

  availableRanks.forEach(rank => {
    const rankPrice = prices[rank];
    const rankAmount = results[rank];
    const returnAmount = rankAmount - interestAmount(rankAmount, interest);

    totalPrice += rankPrice * rankAmount;
    totalReturn += ` ${rank}x - ${returnAmount};`;
  });

  return (
    <div>
      <h5>Total price: {priceToString(totalPrice)}</h5>
      <h5>Total return: {totalReturn.trim()}</h5>
    </div>
  );
};

export const OverviewTable: SFC<StateProps> = ({ interest, items, prices }) => {
  if (items.length === 0) {
    return null;
  }

  const results: CryDictionary = items.reduce<CryDictionary>(
    (acc, item) => {
      const itemsAmount = item.amount;
      const cryAmount = item.crystals.amount;
      const cryRank = item.crystals.rank;

      const cryTotal = cryAmount * itemsAmount;
      acc[cryRank] = (acc[cryRank] || 0) + cryTotal;

      return acc;
    },
    {} as CryDictionary,
  );

  const availableRanks = Object.keys(results).sort() as CrystalRank[];

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
    const price = prices[rank];

    return (
      <tr key={rank}>
        <td>{rank}x</td>
        <td>{amount}</td>
        <td>{priceToString(price)}</td>
        <td>{priceToString(price * amount)}</td>
        <td>{priceToString(amount - interestAmount(amount, interest))}</td>
      </tr>
    );
  });

  return (
    <div key="overview">
      <h1>Overview Table</h1>
      <Status results={results} prices={prices} interest={interest} />
      <table className="table">
        <tbody>
          {headers}
          {rows}
        </tbody>
      </table>
    </div>
  );
};
