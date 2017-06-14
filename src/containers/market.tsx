import { connect } from 'react-redux';

import { connectToFirebase } from '../actions/firebase';
import { Market } from '../components/market/market';
import { toggleItem } from '../actions/market';

import { getBasePrices, getFilteredL2OnPrices, isLoading } from '../reducers/firebase';

const mapStateToProps = state => {
  const loading = isLoading(state);
  const items = getFilteredL2OnPrices(state);
  const basePrices = getBasePrices(state);
  const expandedItems = state.market.expandedItems;

  return {
    loading,
    items,
    basePrices,
    expandedItems,
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
