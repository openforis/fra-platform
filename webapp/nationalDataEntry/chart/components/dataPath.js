import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { interpolatePath } from 'd3-interpolate-path'
import * as d3 from 'd3'
import R from 'ramda'

import { defaultTransitionDuration } from '../chart'

class DataPath extends Component {

  getPath ({xScale, yScale, data}) {
    return d3.line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value))
      .curve(d3.curveLinear)
      (data)
  }

  interpolatePath (previous, current) {
    return d3.select(ReactDOM.findDOMNode(this))
      .transition()
        .ease(d3.easeCircleOut)
        .duration(defaultTransitionDuration)
        .attrTween('d', d => interpolatePath(previous, current))
  }

  componentWillReceiveProps (nextProps) {
    const {xScale, yScale, data} = this.props
    const nextData = nextProps.data
    // enter
    if (nextData.length > 1 && data.length <= 1) {
      const current = this.getPath({...nextProps})
      const previous = this.getPath({
        xScale, yScale,
        data: [
          {year: R.head(nextData).year, value: R.head(nextData).value},
          {year: R.last(nextData).year, value: R.last(nextData).value}
        ]
      })
      this.interpolatePath(previous, current).style('opacity', 1)
    }
    // exit
    else if (nextData.length <= 1 && data.length > 1) {
      const current = this.getPath({...nextProps})
      const next = this.getPath({
        xScale, yScale,
        data: [
          {year: R.head(data).year, value: 0},
          {year: R.last(data).year, value: 0}
        ]
      })
      this.interpolatePath(current, next).style('opacity', 0)
    }
    // update
    else if (nextData.length > 1 && data.length > 1) {
      const previous = ReactDOM.findDOMNode(this).getAttribute('d')
      const current = this.getPath({...nextProps})
      this.interpolatePath(previous, current)
    }
  }

  componentDidMount () {
    const {xScale, yScale, data} = this.props
    if (data.length > 1) {
      const current = this.getPath({...this.props})
      const previous = this.getPath({
        xScale,
        yScale,
        data: [{year: R.head(data).year, value: 0}, {year: R.last(data).year, value: 0}]
      })
      this.interpolatePath(previous, current).style('opacity', 1)
    }
  }

  render () {
    return <path style={{...this.props.style, opacity: 0}} className="chart__data-path"></path>
  }
}

export default DataPath
