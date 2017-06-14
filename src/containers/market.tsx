import { connect } from 'react-redux';

import { connectToFirebase } from '../actions/firebase';
import { Market } from '../components/market/market';

import { getBasePrices, getFilteredL2OnPrices, isLoading } from '../reducers/firebase';

const mapStateToProps = state => {
  const loading = isLoading(state);
  const items = getFilteredL2OnPrices(state);
  const basePrices = getBasePrices(state);

  return {
    loading,
    items,
    basePrices,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectToFirebase: () => dispatch(connectToFirebase()),
  };
};

export const MarketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Market);
