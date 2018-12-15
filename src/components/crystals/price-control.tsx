import * as React from 'react';

const normalizeOnChange = onChange => event => {
  onChange(Number(event.target.value.trim()));
};

export const PriceControl = ({ rank, price, onChange, sellPrice, buyPrice }) => {
  const label = `${rank.toUpperCase()}x`;
  const placeholder = `${label} price`;

  return (
    <div className="form-group" style={{ width: 200, marginRight: 30, verticalAlign: 'top' }}>
      <div className="input-group">
        <input
          className="form-control"
          placeholder={placeholder}
          value={price}
          onChange={normalizeOnChange(onChange)}
        />
        <div className="input-group-addon">{label}</div>
      </div>
      <p>
        <span className="u-color-blue" title="Market median selling price">
          {sellPrice}
        </span>
        &nbsp;/&nbsp;
        <span className="u-color-red" title="Market median buying price">
          {buyPrice}
        </span>
      </p>
    </div>
  );
};
