// Navigation.js

import React from "react";

import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";
// import "./Slider.css"

class Navigation extends React.Component {
  state = {
    year: {
      label: "year",
      min: 20,
      max: 2017,
      step: 5,
      value: { min: 20, max: 2017 },
    },
  };

  onChange = (data) => {
    this.setState({
      [data.type]: {
        ...this.state[data.type],
        value: data.value,
      },
    });
  };

  render() {
    return (
      <section className="navigation">
        <Slider data={this.state.year} onChange={this.onChange} />
        <small>MIN:{this.state.year.value.min}</small> <br />
        <small>MAX:{this.state.year.value.max}</small>
      </section>
    );
  }
}

export default Navigation;

class Slider extends React.Component {
  onChange = (range) => {
    this.props.onChange({
      type: this.props.data.label,
      value: range,
    });
  };
  render() {
    const { min, max, step, value, label } = this.props.data;
    return (
      <div className="slider">
        <label>{label}</label>
        <InputRange
          minValue={min}
          maxValue={max}
          step={step}
          onChange={this.onChange}
          value={value}
        />
      </div>
    );
  }
}
