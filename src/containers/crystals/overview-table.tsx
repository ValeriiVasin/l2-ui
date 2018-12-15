import { connect } from 'react-redux';

import OverviewTable from '../../components/crystals/overview-table';

const mapStateToProps = state => {
  const items = state.crystals.items;
  const prices = state.crystals.price;
  const interest = state.crystals.interest;

  return {
    items,
    prices,
    interest,
  };
};

export default connect(mapStateToProps)(OverviewTable as any);
