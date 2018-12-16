import { connect } from 'react-redux';

import { connectToFirebase } from '../actions/firebase';
import { Market, StateProps, DispatchProps } from '../components/market/market';
import { toggleItem } from '../actions/market';

import { getBasePrices, getFilteredL2OnPrices, isLoading } from '../reducers/firebase';
import { bindActionCreators, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: AppState): StateProps => {
  const loading = isLoading(state);
  const items = getFilteredL2OnPrices(state);
  const basePrices = getBasePrices(state);
  const expandedItems = state.market.expandedItems;
  const l2onUpdateTime = state.firebase.values.updates.l2on;

  return {
    loading,
    items,
    basePrices,
    expandedItems,
    l2onUpdateTime,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): DispatchProps =>
  bindActionCreators(
    {
      connectToFirebase,
      toggle: toggleItem,
    },
    dispatch,
  );

export const MarketContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Market);
