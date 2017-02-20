/** Control inputs */
import { connect } from 'react-redux';

import { PriceControl } from '../../components/crystals/price-control';
import { setPrice } from '../../actions/crystals';

const createStateToProps = rank => state => {
  const price = state.crystals.price[rank];

  return { rank, price };
};

const createDispatchToProps = rank => dispatch => {
  return {
    onChange: price => dispatch(setPrice({ rank, price }))
  };
};

export const DxPriceControl = connect(
  createStateToProps('D'),
  createDispatchToProps('D')
)(PriceControl);

export const CxPriceControl = connect(
  createStateToProps('C'),
  createDispatchToProps('C')
)(PriceControl);

export const BxPriceControl = connect(
  createStateToProps('B'),
  createDispatchToProps('B')
)(PriceControl);
