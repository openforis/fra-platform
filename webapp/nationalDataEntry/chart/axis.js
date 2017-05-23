import React, { Component } from 'react'
import * as d3 from 'd3'

class Axis extends Component {
  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  renderAxis () {
    var node = this.refs.axis
    var axis = this.props.constructor(this.props.scale).ticks(5)
    d3.select(node).call(axis)
  }

  render () {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}

export default Axis
