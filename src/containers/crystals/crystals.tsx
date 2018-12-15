import React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import DetailsTableContainer from './details-table';
import OverviewTableContainer from './overview-table';

import { Spinner } from '../../components/spinner/spinner';

import { connectToFirebase } from '../../actions/firebase';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface CrystalAppProps {
  loading: boolean;
  connectToFirebase: () => void;
}

class CrystalsApp extends React.Component<CrystalAppProps, any> {
  public componentDidMount() {
    this.props.connectToFirebase();
  }

  public render() {
    const { loading } = this.props;

    return (
      <div className="u-padding">
        <Controls />
        {loading ? <Spinner /> : null}
        <OverviewTableContainer />
        <DetailsTableContainer />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ loading: state.crystals.loading });
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  connectToFirebase: () => {
    dispatch(connectToFirebase());
  },
});

const CrystalsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CrystalsApp);

export default CrystalsAppContainer;
