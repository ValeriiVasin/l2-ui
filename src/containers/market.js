import { connect } from 'react-redux';
import { Market } from '../components/market/market';
import { connectToFirebase } from '../actions/market';

const mapStateToProps = state => {
  const items = state.market.items;
  const basePrices = state.market.basePrices;

  return {
    items,
    basePrices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectToFirebase: () => dispatch(connectToFirebase())
  };
};

export const MarketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Market);


