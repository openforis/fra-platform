import React, {Component} from 'react'
import * as d3 from 'd3'
import {hasData, formatNumber, defaultTransitionDuration, styles} from '../chart'

class YAxis extends Component {

  domAxis(props) {

    const axis = d3.axisLeft(props.yScale)
      .ticks(5)
      .tickSizeInner(-props.wrapperWidth)
      .tickSizeOuter(0)
      .tickFormat(formatNumber)
      .tickPadding(8)

    const domAxis = d3.select(this.refs.axis).call(axis)

    domAxis.selectAll('path')
      .style('stroke', '#cccccc')

    domAxis.selectAll('line')
      .style('stroke', (val, i) => i == 0 ? '#cccccc' : 'rgba(0,0,0,.08)')

    return domAxis
  }

  componentDidMount() {
    const propsHasData = hasData(this.props.data)
    const domAxis = this.domAxis(this.props)

    domAxis.selectAll('text')
      .transition()
      .ease(d3.easeBackOut)
      .duration(defaultTransitionDuration)
      .attrTween('fill', () =>
        // enter
        propsHasData
          ? d3.interpolateRgb('#ffffff', '#666666')
          : d3.interpolateRgb('#ffffff', '#ffffff')
      )

    domAxis
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attr('transform', d => `translate(${propsHasData ? this.props.left : '0'}, 0)`)

    d3.select(this.refs.unitLabel)
      .transition()
      .ease(d3.easeBackOut)
      .duration(defaultTransitionDuration)
      .delay(propsHasData ? defaultTransitionDuration : 0)
      .style('opacity', () => propsHasData ? 1 : 0)
  }

  componentWillReceiveProps(nextProps) {
    const propsHasData = hasData(this.props.data)
    const nextPropsHasData = nextProps ? hasData(nextProps.data) : false
    const domAxis = nextProps ? this.domAxis(nextProps) : this.domAxis(this.props)

    domAxis.selectAll('text')
      .transition()
      .ease(d3.easeBackIn)
      .duration(defaultTransitionDuration)
      .attrTween('fill', () =>
        !propsHasData && nextPropsHasData
          // enter
          ? d3.interpolateRgb('#ffffff', '#666666')
          // update
          : d3.interpolateRgb('#666666', '#666666')
      )

    //exit
    if (!nextPropsHasData)
      domAxis.selectAll('text').remove()

    domAxis
      .transition()
      .ease(d3.easePolyOut)
      .duration(defaultTransitionDuration)
      .attr('transform', d => `translate(${nextPropsHasData ? nextProps.left : '0'}, 0)`)

    d3.select(this.refs.unitLabel)
      .transition()
      .ease(d3.easeBackOut)
      .duration(defaultTransitionDuration)
      .delay(nextPropsHasData ? defaultTransitionDuration : 0)
      .style('opacity', () => nextPropsHasData ? 1 : 0)

  }

  render() {

    return <g className="chart__y-axis">
      <text
        ref="unitLabel"
        x="12"
        y={styles.top}
        style={{
          fontSize: '10px',
          fill: 'rgba(102, 102, 102, .5)',
          opacity: 0
        }}>
        1 000 ha
      </text>
      <g ref="axis"></g>
    </g>
  }
}

export default YAxis
