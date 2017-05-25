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
    var axis = d3.axisLeft(this.props.yScale).ticks(5).tickSizeInner(-(this.props.width - this.props.padding * 3)).tickSizeOuter(0)
    const node = this.refs.axis
    d3.select(node).call(axis)
      .selectAll('path').style('stroke', '#cccccc')
    d3.select(node).selectAll('text').remove()
    d3.select(node).selectAll('line').style('stroke', (val, i) => i == 0 ? '#cccccc' : 'rgba(204,204,204,0.3)')
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(${this.props.padding}, 0)`}></g>
  }
}

export default YAxis
