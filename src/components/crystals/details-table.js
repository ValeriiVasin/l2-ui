export const DetailsTable = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  let totalItemsAmount = 0;

  const rows = items.map(item => {
    const cryRank = item.crystals.rank;
    const cryAmount = item.crystals.amount;
    const cryPrice = this.state.price[cryRank];

    const name = item.name;
    const amount = item.amount;

    totalItemsAmount += amount;

    const cryTotal = cryAmount * amount;
    const priceTotal = cryPrice * cryTotal;

    return (
      <tr key={name}>
        <td width="64">
          <a href={ 'https://l2central.info/classic/' + name } target="_blank">
            <img src={`http://l2.valeriivasin.com/image/${name}`} alt={name} />
          </a>
        </td>
        <td className="u-vertical-align-middle">
          <a href={ 'https://l2central.info/classic/' + name } target="_blank">{name}</a>
        </td>
        <td className="u-vertical-align-middle">{amount}</td>
        <td className="u-vertical-align-middle">{cryRank}x {cryAmount}</td>
        <td className="u-vertical-align-middle">{cryRank}x {cryTotal}</td>
        <td className="u-vertical-align-middle">{priceToString(priceTotal)}</td>
      </tr>
    );
  });

  return (
    <div key='details'>
      <h1>Details - {totalItemsAmount}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Amount</th>
            <th>cry pre item</th>
            <th>cry total</th>
            <th>Price (total)</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
