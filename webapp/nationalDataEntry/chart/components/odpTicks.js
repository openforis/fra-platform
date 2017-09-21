import React from 'react'
import * as d3 from 'd3'
import ReactDOM from 'react-dom'

import { defaultTransitionDuration } from '../chart'

class OdpTicks extends React.Component {

  update (props) {
    const {xScale, yScale, data} = props

    if (data) {

      const line = d3.select(ReactDOM.findDOMNode(this.refs.lines))
        .selectAll('line')
        .data(data)

      //update
      line
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCircleOut)
        .attr('x1', d => xScale(d.year))
        .attr('y1', d => yScale(0))
        .attr('x2', d => xScale(d.year))
        .attr('y2', d => yScale(d.value))

      //exit
      line.exit()
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCircleOut)
        .attr('y2', d => yScale(0))
        .style('opacity', '0')
        .remove()

      //enter
      line.enter().append('line')
        .attr('x1', d => xScale(d.year))
        .attr('y1', d => yScale(0))
        .attr('x2', d => xScale(d.year))
        .attr('y2', d => yScale(0))
        .style('opacity', 0)
        .style('stroke', '#cccccc')
        .style('stroke-width', 1)
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCubicOut)
        .attr('y2', d => yScale(d.value))
        .style('opacity', '1')
    }
  }

  componentDidMount () {
    this.update(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.update(nextProps)
  }

  render () {
    return <g ref="lines"></g>
  }
}

export default OdpTicks
