import React, { Component } from 'react';
import './ChartRace.css';

export default class ChartRace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.sort((a, b) => b.value - a.value),
      temp: this.props.data,
      maxValue: Math.max.apply(Math, this.props.data.map(item => item.value))
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newProps = [...nextProps.data];
    return {
      data: nextProps.data,
      temp: newProps.sort((a, b) => b.value - a.value),
      maxValue: Math.max.apply(Math, nextProps.data.map(item => item.value))
    };
  }

  draw(item, index) {
    const indis = this.state.temp.findIndex(temp => temp.id === item.id);
    const translateY = indis === 0 ? this.props.padding : (this.props.padding + (indis * this.props.itemHeight) + (indis * this.props.gap));
    return (
      <div key={index} className="raceItem" style={{ height: this.props.itemHeight, transform: 'translateY(' + translateY + 'px) translateX(' + this.props.padding + 'px)' }}>
        <b style={{
          backgroundColor: item.color,
          width: item.value / this.state.maxValue * (this.props.width - (2 * this.props.padding))
        }}>
          {/* <span> */}
          <em style={this.props.titleStyle}>{item.title} ({item.value} cases)</em>
          {/* <i style={this.props.valueStyle}>{item.value}</i> */}
          {/* </span> */}
        </b>
      </div>
    );
  }

  render() {
    return (
      <div className="raceArea" style={{ backgroundColor: this.props.backgroundColor, paddingTop: this.props.padding, paddingBottom: this.props.padding, width: this.props.width, height: (2 * this.props.padding) + (this.state.temp.length * this.props.itemHeight) + ((this.state.temp.length - 1) * this.props.gap) }}>
        {this.state.data.map((item, index) => this.draw(item, index))}
      </div>
    );
  }

}

ChartRace.defaultProps = {
  data: [],
  backgroundColor: '#EEE',
  width: 680,
  padding: 20,
  itemHeight: 30,
  gap: 4,
  titleStyle: { font: 'normal 400 13px Arial', color: '#000' },
  valueStyle: { font: 'normal 400 11px Arial', color: '#777' }
};