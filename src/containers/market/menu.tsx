/** Control inputs */
import * as React from 'react';
import { connect } from 'react-redux';
import { uniq } from 'lodash';

interface IMarketMenuItem {
  name: TL2OnConfigItemType;
  isActive: boolean;
}

const MenuComponent = ({
  items,
  loading,
}: { items: IMarketMenuItem[]; loading: boolean }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const menu = items.map(item => {
    const className = item.isActive ? 'is-active' : '';
    return <li key={item.name} className={className}>{item.name}</li>;
  });

  return (
    <ul>
      {menu}
    </ul>
  );
};

const mapStateToProps = (state: IAppState) => {
  const loading = state.firebase.loading;
  const filter = state.market.filter;

  if (loading) {
    return { loading, items: [], filter };
  }

  const items = [
    'all',
    ...uniq(
      state.firebase.values.config.l2on.map(config => config.type),
    ),
    'favorites',
  ].map(item => ({ name: item, isActive: item === filter }));

  return {
    loading,
    items,
  };
};

export default connect(mapStateToProps)(MenuComponent);
