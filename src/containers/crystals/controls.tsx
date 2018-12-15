/** Control inputs */
import React, { RefObject, createRef, ChangeEvent } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItems, setInterest, setPrice, setText } from '../../actions/crystals';
import { PriceControl } from '../../components/crystals/price-control';
import { getMedianPrice } from '../../reducers/firebase';

const createStateToProps = rank => state => {
  const price = state.crystals.price[rank];
  const sellPrice = getMedianPrice(state, `Кристалл: Ранг ${rank}`, 'sell');
  const buyPrice = getMedianPrice(state, `Кристалл: Ранг ${rank}`, 'buy');

  return { rank, price, sellPrice, buyPrice };
};

const createDispatchToProps = rank => dispatch => {
  return {
    onChange: price => dispatch(setPrice({ rank, price })),
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

const normalizeOnChange = onChange => event => {
  onChange(Number(event.target.value.trim()));
};

const InterestControl = ({ interest, onChange }) => {
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
    onChange: value => dispatch(setInterest({ interest: value })),
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

    const handleSubmit = event => {
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

const mapDispatchToProps = dispatch => ({
  onChange: text => dispatch(setText(text)),
  onSubmit: text => dispatch(fetchItems(text)),
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
