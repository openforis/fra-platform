import React from 'react'
import ReactDOM from 'react-dom'

import * as d3 from 'd3'

import { defaultTransitionDuration } from '../chart'

type Props = any
class OdpTicks extends React.Component {
  update(props: Props) {
    const { xScale, yScale, data } = props
    if (data) {
      // @ts-ignore
      const line = d3.select(ReactDOM.findDOMNode(this.refs.lines)).selectAll('line').data(data)
      // update
      line
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('x1', (d: any) => xScale(d.year))
        .attr('y1', (d: any) => yScale(0))
        .attr('x2', (d: any) => xScale(d.year))
        .attr('y2', (d: any) => yScale(d.value))
      // exit
      line
        .exit()
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('y2', (d: any) => yScale(0))
        .style('opacity', '0')
        .remove()
      // enter
      line
        .enter()
        .append('line')
        .attr('x1', (d: any) => xScale(d.year))
        .attr('y1', (d: any) => yScale(0))
        .attr('x2', (d: any) => xScale(d.year))
        .attr('y2', (d: any) => yScale(0))
        .style('opacity', 0)
        .style('stroke', '#cccccc')
        .style('stroke-width', 1)
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('y2', (d: any) => yScale(d.value))
        .style('opacity', '1')
    }
  }

  componentDidMount() {
    this.update(this.props)
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    this.update(this.props)
  }

  render() {
    return <g ref="lines" className={(this.props as Props).className} />
  }
}
export default OdpTicks
