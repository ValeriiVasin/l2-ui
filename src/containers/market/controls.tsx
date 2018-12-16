import React, { SFC } from 'react';
import { connect } from 'react-redux';

import { toggleItems, MarketAsyncActions, toggleActive } from '../../actions/market';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
  isActiveOnly: boolean;
}

interface DispatchProps {
  handleActiveToggle: (value: boolean) => void;
  handleToggle: (value: boolean) => void;
}

export const MarketControlsComponent: SFC<StateProps & DispatchProps> = ({
  isActiveOnly,
  handleActiveToggle,
  handleToggle,
}) => {
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

const mapStateToProps = (state: AppState): StateProps => {
  return {
    isActiveOnly: true,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): DispatchProps =>
  bindActionCreators(
    {
      handleToggle: toggleItems,
      handleActiveToggle: toggleActive,
    },
    dispatch,
  );

export const MarketControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketControlsComponent);
