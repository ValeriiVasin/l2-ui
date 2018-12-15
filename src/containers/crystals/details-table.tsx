import { connect } from 'react-redux';

import { DetailsTable } from '../../components/crystals/details-table';

const mapStateToProps = (state: AppState) => {
  const items = state.crystals.items;
  const prices = state.crystals.price;

  return {
    items,
    prices,
  };
};

export default connect(mapStateToProps)(DetailsTable as any);
