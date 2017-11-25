import { connect } from 'react-redux';

import { connectToFirebase } from '../actions/firebase';
import { Market } from '../components/market/market';
import { toggleItem } from '../actions/market';

import { getBasePrices, getFilteredL2OnPrices, isLoading } from '../reducers/firebase';

const mapStateToProps = (state: IAppState) => {
  const loading = isLoading(state);

  if (loading) {
    return {
      loading,
    };
  }

  const items = getFilteredL2OnPrices(state);
  const basePrices = getBasePrices(state);
  const expandedItems = state.market.expandedItems;
  const l2onUpdateTime = state.firebase.values.updates.l2on;

  return {
    loading,
    items,
    basePrices,
    expandedItems,
    l2onUpdateTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectToFirebase: () => dispatch(connectToFirebase()),
    toggle: id => dispatch(toggleItem(id)),
  };
};

export const MarketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Market);
