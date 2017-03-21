import React from 'react';

import Controls from './controls';
import DetailsTableContainer from './details-table';
import OverviewTableContainer from './overview-table';

export default () => {
  return <div className="u-padding">
    <Controls />
    <OverviewTableContainer />
    <DetailsTableContainer />
  </div>;
};
