import React, { SFC } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { uniq } from 'lodash';
import { filterMarket } from '../../actions/market';
import { isLoading } from '../../reducers/firebase';

interface MarketMenuItem {
  name: L2OnConfigFilterType;
  isActive: boolean;
}

interface StateProps {
  items: MarketMenuItem[];
  loading: boolean;
}

interface DispatchProps {
  handleFilterMarket: (name: L2OnConfigFilterType) => void;
}

const MenuComponent: SFC<StateProps & DispatchProps> = ({ items, loading, handleFilterMarket }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const menu = items.map(item => {
    const className = item.isActive ? 'active' : '';
    return (
      <li
        key={item.name}
        className={className}
        role="presentation"
        onClick={() => handleFilterMarket(item.name)}
      >
        <a href="javascript:void(0)">{item.name}</a>
      </li>
    );
  });

  return <ul className="nav nav-pills nav-justified">{menu}</ul>;
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = (state): StateProps => {
  const filter = state.market.filter;

  if (isLoading(state)) {
    return { loading: true, items: [] };
  }

  const items: MarketMenuItem[] = [
    'all' as L2OnConfigFilterType,
    ...uniq(state.firebase.values.config.l2on.map(config => config.type)),
    'favorites' as L2OnConfigFilterType,
  ].map(item => ({ name: item, isActive: item === filter }));

  return {
    loading: false,
    items,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch): DispatchProps => ({
  handleFilterMarket(filter: L2OnConfigFilterType) {
    dispatch(filterMarket(filter));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuComponent);
