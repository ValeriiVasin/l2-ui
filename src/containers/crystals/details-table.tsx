import { connect } from 'react-redux';

import { DetailsTable } from '../../components/crystals/details-table';
import { ComponentProps, forwardRef } from 'react';

const mapStateToProps = (state: AppState): ComponentProps<typeof DetailsTable> => {
  const items = state.crystals.items;
  const prices = state.crystals.price;

  return {
    items,
    prices,
  };
};

export default connect(mapStateToProps)(DetailsTable);
