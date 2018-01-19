import * as React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import DetailsTableContainer from './details-table';
import OverviewTableContainer from './overview-table';

import { Spinner } from '../../components';

import { connectToFirebase } from '../../actions/firebase';

interface ICrystalAppProps {
  loading: boolean;
  connectToFirebase: () => void;
}

class CrystalsApp extends React.Component<ICrystalAppProps, any> {
  public componentDidMount() {
    this.props.connectToFirebase();
  }

  public render() {
    const { loading } = this.props;

    return (
      <div className='u-padding'>
        <Controls />
        { loading ? <Spinner /> : null }
        <OverviewTableContainer />
        <DetailsTableContainer />
      </div>
    );
  }
}

const CrystalsAppContainer = connect(
  (state: IAppState) => ({ loading: state.crystals.loading }),
  dispatch => ({
    connectToFirebase: () => {
      dispatch(connectToFirebase());
    },
  }),
)(CrystalsApp);

export default CrystalsAppContainer;
