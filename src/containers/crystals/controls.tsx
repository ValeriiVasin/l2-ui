/** Control inputs */
import React, { RefObject, createRef, ChangeEvent, SFC, FormEvent } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItems, setInterest, setPrice, setText } from '../../actions/crystals';
import { PriceControl } from '../../components/crystals/price-control';
import { getMedianPrice } from '../../reducers/firebase';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const createStateToProps = (rank: CrystalRank) => (state: AppState) => {
  const price = state.crystals.price[rank];
  const sellPrice = getMedianPrice(state, `Кристалл: Ранг ${rank}`, 'sell');
  const buyPrice = getMedianPrice(state, `Кристалл: Ранг ${rank}`, 'buy');

  return { rank, price, sellPrice, buyPrice };
};

const createDispatchToProps = (rank: CrystalRank) => (dispatch: Dispatch<AnyAction>) => {
  return {
    onChange: (price: number) => dispatch(setPrice({ rank, price })),
  };
};

export const DxPriceControl = connect(
  createStateToProps('D'),
  createDispatchToProps('D'),
)(PriceControl);

export const CxPriceControl = connect(
  createStateToProps('C'),
  createDispatchToProps('C'),
)(PriceControl);

export const BxPriceControl = connect(
  createStateToProps('B'),
  createDispatchToProps('B'),
)(PriceControl);

const normalizeOnChange = (onChange: (interest: number) => void) => (
  event: ChangeEvent<HTMLInputElement>,
) => {
  onChange(Number(event.target.value.trim()));
};

const InterestControl: SFC<{ interest: number; onChange: (interest: number) => void }> = ({
  interest,
  onChange,
}) => {
  return (
    <div className="form-group" style={{ width: 200, marginRight: 30 }}>
      <div className="input-group">
        <input
          className="form-control"
          placeholder="interest percentage"
          value={interest}
          onChange={normalizeOnChange(onChange)}
        />
        <div className="input-group-addon">%</div>
      </div>
    </div>
  );
};

const InterestControlContainer = connect(
  (state: AppState) => ({ interest: state.crystals.interest }),
  dispatch => ({
    onChange: (value: number) => dispatch(setInterest({ interest: value })),
  }),
)(InterestControl);

class TextInputControl extends Component<any, any> {
  private inputRef: RefObject<HTMLInputElement> = createRef();

  public componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  public render() {
    const { text, onChange, onSubmit } = this.props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(text);
    };

    return (
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} ref={this.inputRef} className="form-control" />
      </form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ text: state.crystals.text });

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  onChange: (text: string) => dispatch(setText(text)),
  onSubmit: (text: string) => dispatch(fetchItems(text)),
});

const TextInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextInputControl);

export default () => {
  return (
    <div>
      <TextInputContainer />

      <form className="form-inline" key="controls" style={{ marginTop: 30 }}>
        <DxPriceControl />
        <CxPriceControl />
        <BxPriceControl />

        <InterestControlContainer />
      </form>
    </div>
  );
};
