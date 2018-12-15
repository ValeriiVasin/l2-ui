import React from 'react';
import { connect } from 'react-redux';
import { uniq } from 'lodash';
import { filterMarket } from '../../actions/market';
import { isLoading } from '../../reducers/firebase';

interface MarketMenuItem {
  name: L2OnConfigItemType;
  isActive: boolean;
}

const MenuComponent = ({
  items,
  loading,
  handleFilterMarket,
}: {
  items: MarketMenuItem[];
  loading: boolean;
  handleFilterMarket: (name: L2OnConfigFilterType) => void;
}) => {
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

const mapStateToProps = (state: AppState) => {
  const filter = state.market.filter;

  if (isLoading(state)) {
    return { loading: true, items: [], filter };
  }

  const items = [
    'all',
    ...uniq(state.firebase.values.config.l2on.map(config => config.type)),
    'favorites',
  ].map(item => ({ name: item, isActive: item === filter }));

  return {
    loading: false,
    items,
    filter,
  };
};

const mapDispatchToProps = dispatch => ({
  handleFilterMarket(filter: L2OnConfigFilterType) {
    dispatch(filterMarket(filter));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuComponent);
