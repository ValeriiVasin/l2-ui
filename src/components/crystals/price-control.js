import React from 'react';

export const PriceControl = ({ rank, price, onChange }) => {
  const label = `${rank.toUpperCase()}x`;
  const placeholder = `${label} price`;

  return <div
    className="form-group"
    style={{ width: 200, marginRight: 30, verticalAlign: 'top' }}
    >
    <div className="input-group">
      <input
        className="form-control"
        placeholder={placeholder}
        value={price}
        onChange={onChange}
        />
      <div className="input-group-addon">{label}</div>
    </div>
    <p>
      <span className="u-color-blue" title="Market median selling price">420</span>
      &nbsp;/&nbsp;
      <span className="u-color-red" title="Market median buying price">380</span>
    </p>
  </div>;
};
