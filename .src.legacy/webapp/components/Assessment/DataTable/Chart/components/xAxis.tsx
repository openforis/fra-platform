import React, { Component } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'
import { getChartYears } from '../chart'
type Props = any

class XAxis extends Component {
  props: Props
  refs: any

  componentDidMount() {
    this.renderAxis(this.props)
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    this.renderAxis(this.props)
  }

  renderAxis(props: any) {
    const chartYears = getChartYears(props.data)
    const tickValues = R.filter((v: any) => v % 5 === 0, R.range(chartYears.min, chartYears.max))
    const axis = d3
      .axisBottom(props.xScale)
      .tickValues(tickValues)
      .tickFormat(d3.format('0000'))
      .tickSize(0)
      .tickPadding(16)
    const node = d3.select(this.refs.axis)
    node.call(axis).selectAll('text').style('fill', '#666666').style('font-size', '11px')
    node.select('path').remove()
  }

  render() {
    return (
      <g
        className="chart__x-axis"
        ref="axis"
        transform={`translate(0, ${(this.props as any).height - (this.props as any).bottom})`}
      />
    )
  }
}
export default XAxis
