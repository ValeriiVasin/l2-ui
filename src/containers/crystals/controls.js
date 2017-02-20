/** Control inputs */

import React from 'react';
import { connect } from 'react-redux';

import { PriceControl } from '../../components/crystals/price-control';

const mapStateToProps = state => {
  const rank = 'D';

  return {
    rank,
    price: state.crystals.price[rank]
  };
};

const mapDispatchToProps = dispatch => {

};

const DxPriceControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceControl);
