import React, { Component } from 'react'
import * as d3 from 'd3'
import R from 'ramda'
class XAxis extends Component {
  componentDidMount () {
    this.renderAxis()
  }

  renderAxis () {
    const tickValues = R.filter(v => v % 5 == 0, R.range(1990, 2021))
    var axis = d3.axisBottom(this.props.xScale).tickValues(tickValues).tickFormat(d3.format('0000')).tickSize(0).tickPadding(16)

    const node = this.refs.axis
    d3.select(node).call(axis)
      .selectAll('text').style('fill', '#666666').style('font-size', '11px')

    d3.select(node).select('path').remove()
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(0, ${this.props.height - (this.props.padding/2)})`}></g>
  }
}

export default XAxis
