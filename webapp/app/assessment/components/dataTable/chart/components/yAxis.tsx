import React, { Component } from 'react'
import * as d3 from 'd3'
import { hasData, defaultTransitionDuration } from '../chart'

const replaceCommasWithSpaces = (v: any) => d3.format(',')(v).replace(/,/g, ' ')
type Props = any
class YAxis extends Component {
  props: Props
  refs: any
  domAxis(props: any) {
    const axis = d3
      .axisLeft(props.yScale)
      .ticks(5)
      .tickSizeInner(-props.wrapperWidth)
      .tickSizeOuter(0)
      .tickFormat(replaceCommasWithSpaces)
      .tickPadding(8)
    const domAxis = d3.select(this.refs.axis).call(axis)
    domAxis.selectAll('path').style('stroke', '#cccccc')
    domAxis.selectAll('line').style('stroke', (val: any, i: any) => (i == 0 ? '#cccccc' : 'rgba(0,0,0,.08)'))
    domAxis.selectAll('text').style('fill', '#666666').style('font-size', '11px')
    return domAxis
  }

  componentDidMount() {
    const propsHasData = hasData((this.props as any).data)
    const domAxis = this.domAxis(this.props)
    domAxis
      .selectAll('text')
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attrTween('fill', () =>
        // enter
        propsHasData ? d3.interpolateRgb('#ffffff', '#666666') : d3.interpolateRgb('#ffffff', '#ffffff')
      )
    domAxis
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attr('transform', (d: any) => `translate(${propsHasData ? (this.props as any).left : '0'}, 0)`)
    d3.select(this.refs.unitLabel)
      .transition()
      .ease(d3.easePolyOut)
      .delay(100)
      .duration(defaultTransitionDuration)
      .style('opacity', () => (propsHasData ? 1 : 0))
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const prevPropsHaveData = hasData(prevProps.data)
    const currentPropsHaveData = this.props ? hasData((this.props as any).data) : false
    const domAxis = this.props ? this.domAxis(this.props) : this.domAxis(prevProps)
    domAxis
      .selectAll('text')
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attrTween('fill', () =>
        !prevPropsHaveData && currentPropsHaveData
          ? // enter
            d3.interpolateRgb('#ffffff', '#666666')
          : // update
            d3.interpolateRgb('#666666', '#666666')
      )
    // exit
    if (!currentPropsHaveData) domAxis.selectAll('text').remove()
    domAxis
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attr('transform', (d: any) => `translate(${currentPropsHaveData ? (this.props as any).left : '0'}, 0)`)
    d3.select(this.refs.unitLabel)
      .transition()
      .ease(d3.easePolyOut)
      .delay(100)
      .duration(defaultTransitionDuration)
      .style('opacity', () => (currentPropsHaveData ? 1 : 0))
  }

  render() {
    return (
      <g className="chart__y-axis">
        <text
          ref="unitLabel"
          x="17"
          y="14"
          style={{
            fontSize: '11px',
            fill: '#666666',
            opacity: 0,
          }}
        >
          1000 ha
        </text>
        <g ref="axis" />
      </g>
    )
  }
}
export default YAxis
