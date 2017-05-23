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
    var axis = d3.axisBottom(this.props.xScale).ticks(5).tickFormat(d3.format('0000')).tickSize(0).tickPadding(10)

    const node = this.refs.axis
    d3.select(node).call(axis)
      .selectAll('text').style('fill', '#666666').style('font-size', '12px')

    d3.select(node).select('path').remove()//.style('stroke','#cccccc')
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(0, ${this.props.height - this.props.padding})`}></g>
  }
}

export default XAxis
