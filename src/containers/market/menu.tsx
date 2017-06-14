/** Control inputs */
import { uniq } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

const MenuComponent = ({ items, loading }: { items: TL2OnConfigItemType[], loading: boolean }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const menu = items.map(item => <li key={item}>{item}</li>);

  return (
    <ul>
      {menu}
    </ul>
  );
};

const mapStateToProps = (state: IAppState) => {
  const loading = state.firebase.loading;

  if (loading) {
    return { loading, items: [] };
  }

  const items = uniq(
    state.firebase.values.config.l2on.map(config => config.type),
  );

  return {
    loading,
    items,
  };
};

export default connect(mapStateToProps)(MenuComponent);
