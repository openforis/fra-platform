import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import R from 'ramda'

import NoDataPlaceholder from './noDataPlaceholder'
import DataCircles from './dataCircles'
import XAxis from './xAxis'
import YAxis from './yAxis'

const styles = {
  width: 800,
  height: 300,
  padding: 30
}

// Returns the highest Y coordinate from the data set
const yMax = (data) => d3.max(data, (d) => d.forestArea)

// Returns a function that "scales" X coordinates from the data to fit the chart
const getXScale = (data) => {
  return d3.scaleLinear()
    .domain([1987, 2023])
    .range([styles.padding, styles.width - styles.padding * 2])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
const getYScale = (data) => {
  let max = yMax(data)
  max = max ? max : 98765

  return d3.scaleLinear()
    .domain([0, max])
    .range([styles.height - styles.padding, styles.padding])
}

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.data, nextProps.data)
    return !isDataEqual
  }

  render () {
    return <div ref="chartContainer">
      { this.props.data ? <svg width={styles.width} height={styles.height}>
        <NoDataPlaceholder {...this.props} {...styles} />
        <DataCircles {...this.props} {...styles} />
        <XAxis {...this.props} {...styles} />
        <YAxis {...this.props} {...styles} />
      </svg>
        : null }
    </div>
  }
}

const linearExtrapolation = (x, xa, ya, xb, yb) => {
  let y = ya + (x - xa) / (xb - xa) * (yb - ya)
  y = y < 0 ? 0 : y
  return y
}

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) => {
  let y = yb + (xb - x) / (xb - xa) * (ya - yb)
  y = y < 0 ? 0 : y
  return y
}

const addPlaceholders = (data) => {

  const fraData = R.filter(v => v.type === 'fra', data)

  if (data.length >= 2 && fraData.length > 0) {
    const firstPoint = {
      year: 1987, type: 'placeholder',
      forestArea: linearExtrapolationBackwards(1987, data[0].year, data[0].forestArea, data[1].year, data[1].forestArea)
    }
    const lastIndex = data.length - 1
    const lastPoint = {
      year: 2023, type: 'placeholder',
      forestArea: linearExtrapolation(2023, data[lastIndex - 1].year, data[lastIndex - 1].forestArea, data[lastIndex].year, data[lastIndex].forestArea)
    }
    return R.pipe(
      R.insert(0, firstPoint),
      R.insert(data.length + 1, lastPoint)
    )(data)

  }
  return data
}
const mapStateToProps = state => {
  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {
    let data = R.pipe(
      R.values,
      R.filter(v => typeof v.forestArea === 'number'),
      R.map((v) => { return {year: v.year, forestArea: v.forestArea, type: v.type, estimated: v.estimated} }),
      addPlaceholders
    )(nde.fra)

    const xScale = getXScale(data)
    const yScale = getYScale(data)

    return {data, xScale, yScale}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
