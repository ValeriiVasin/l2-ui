import * as React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import DetailsTableContainer from './details-table';
import OverviewTableContainer from './overview-table';

import { Spinner } from '../../components';

const CrystalsApp = ({ loading }: { loading: boolean }) => {
  return (
    <div className="u-padding">
      <Controls />
      { loading ? <Spinner /> : null }
      <OverviewTableContainer />
      <DetailsTableContainer />
    </div>
  );
};

const CrystalsAppContainer = connect(
  state => ({ loading: state.crystals.loading }),
)(CrystalsApp);

export default CrystalsAppContainer;
