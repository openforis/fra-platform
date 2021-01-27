import React from 'react'
import * as d3 from 'd3'
import { hasData, defaultTransitionDuration } from '../chart'

const tucanY = 20
const tucanWidth = 62
const tucanHeight = 87

class NoDataPlaceholder extends React.Component {

  getTucanX () {
    return (this.props.wrapperWidth - tucanWidth) / 2
  }

  tucan () {
    return d3.select(this.refs.tucan)
  }

  hidePlaceholderAnimated () {
    this.tucan()
      .transition()
      .duration(defaultTransitionDuration)
      .delay(100)
      .ease(d3.easeBackInOut)
      .attr('y', -tucanHeight)
      .style('opacity', '0')
      .transition()
      .style('visibility', 'hidden')
  }

  hidePlaceholder () {
    this.tucan()
      .transition()
      .duration(100)
      .style('visibility', 'hidden')
      .style('opacity', '0')
  }

  showPlaceholder () {
    this.tucan()
      .attr('y', tucanY)
      .transition()
      .duration(100)
      .style('visibility', 'visible')
      .style('opacity', '1')
  }

  componentDidMount () {
    hasData(this.props.data) ? this.hidePlaceholder() : this.showPlaceholder()
  }

  componentDidUpdate (prevProps, prevState) {
    const prevPropsHaveData = hasData(prevProps.data)
    const currentPropsHaveData = this.props ? hasData(this.props.data) : false

    if (prevPropsHaveData && !currentPropsHaveData) {
      this.showPlaceholder()
    } else if (!prevPropsHaveData && currentPropsHaveData) {
      this.hidePlaceholderAnimated()
    }
  }

  componentWillUnmount () {
    this.hidePlaceholder()
  }

  render () {
    return <g className="chart__no-data-placeholder" ref="container">
      <image ref="tucan" href="/img/tucan.svg" width={tucanWidth} height={tucanHeight} x={this.getTucanX()} y={tucanY} style={{opacity: 0}}/>
    </g>
  }
}

export default NoDataPlaceholder
