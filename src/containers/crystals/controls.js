/** Control inputs */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PriceControl } from '../../components/crystals/price-control';
import { setPrice, setInterest, setText, fetchItems } from '../../actions/crystals';

const createStateToProps = rank => state => {
  const price = state.crystals.price[rank];

  return { rank, price };
};

const createDispatchToProps = rank => dispatch => {
  return {
    onChange: price => dispatch(setPrice({ rank, price }))
  };
};

export const DxPriceControl = connect(
  createStateToProps('D'),
  createDispatchToProps('D')
)(PriceControl);

export const CxPriceControl = connect(
  createStateToProps('C'),
  createDispatchToProps('C')
)(PriceControl);

export const BxPriceControl = connect(
  createStateToProps('B'),
  createDispatchToProps('B')
)(PriceControl);

const normalizeOnChange = onChange => event => {
  onChange(
    Number(event.target.value.trim())
  );
};

const InterestControl = ({ interest, onChange }) => {
  return <div className="form-group" style={{ width: 200, marginRight: 30 }}>
    <div className="input-group">
      <input
        className="form-control"
        placeholder="interest percentage"
        value={interest}
        onChange={normalizeOnChange(onChange)}
        />
      <div className="input-group-addon">%</div>
    </div>
  </div>;
};

const InterestControlContainer = connect(
  state => ({ interest: state.crystals.interest }),
  dispatch => ({
    onChange: value => dispatch(setInterest({ interest: value })),
  })
)(InterestControl);

class TextInputControl extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      text,
      onChange,
      onSubmit
    } = this.props;

    const handleChange = event => {
      onChange(event.target.value);
    };

    const handleSubmit = event => {
      event.preventDefault();
      onSubmit(this.input.value);
    };

    return <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        ref={node => this.input = node}
        className="form-control"
        />
    </form>;
  }
}

const TextInputContainer = connect(
  state => ({ text: state.crystals.text }),
  dispatch => ({
    onChange: text => dispatch(setText(text)),
    onSubmit: text => dispatch(fetchItems(text))
  })
)(TextInputControl);

export default () => {
  return <div>
    <TextInputContainer />

    <form className="form-inline" key="controls" style={{ marginTop: 30 }}>
      <DxPriceControl />
      <CxPriceControl />
      <BxPriceControl />

      <InterestControlContainer />
    </form>
  </div>;
};
