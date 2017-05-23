import React, { Component } from 'react'
import * as d3 from 'd3'

class YAxis extends Component {
  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  renderAxis () {
    var axis = d3.axisLeft(this.props.yScale)//.ticks(5)
    d3.select(this.refs.axis).call(axis)
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(${this.props.padding}, 0)`}></g>
  }
}

export default YAxis
