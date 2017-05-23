import React, { Component } from 'react'
import * as d3 from 'd3'

class XAxis extends Component {
  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  renderAxis () {
    var axis = d3.axisBottom(this.props.xScale).ticks(5)
    d3.select(this.refs.axis).call(axis)
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(0, ${this.props.height - this.props.padding})`}></g>
  }
}

export default XAxis
