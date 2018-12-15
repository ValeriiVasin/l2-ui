import React from 'react';
import { connect } from 'react-redux';

import { toggleItems } from '../../actions/market';

export const MarketControlsComponent = ({ isActiveOnly, handleActiveToggle, handleToggle }) => {
  return (
    <div>
      <a
        href="javascript:void(0)"
        className="u-inline-block u-padding"
        onClick={() => handleToggle(true)}
      >
        Expand all
      </a>
      <a
        href="javascript:void(0)"
        className="u-inline-block u-padding"
        onClick={() => handleToggle(false)}
      >
        Collapse all
      </a>

      <div className="u-inline-block">
        <input
          type="checkbox"
          name="active-only"
          id="active-only"
          checked={isActiveOnly}
          onChange={() => handleActiveToggle(!isActiveOnly)}
        />
        <label htmlFor="active-only">Active only</label>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isActiveOnly: true,
  };
};

const mapDispatchToProps = dispatch => ({
  handleToggle(value: boolean) {
    dispatch(toggleItems(value));
  },

  handleActiveToggle(value: boolean) {
    // console.log('handle active toggle', value);
  },
});

export const MarketControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketControlsComponent);
