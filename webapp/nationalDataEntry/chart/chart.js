import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import R from 'ramda'
import DataCircles from './data-circles'
import XAxis from './x-axis'
import YAxis from './y-axis'

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
    .domain([1990, 2020])
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
        <DataCircles {...this.props} {...styles} />
        <XAxis {...this.props} {...styles} />
        <YAxis {...this.props} {...styles} />
      </svg>
        : null }
    </div>
  }
}

const mapStateToProps = state => {
  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {
    const data = R.pipe(
      R.values,
      R.filter(v => v.forestArea),
      R.map((v) => { return {year: v.year, forestArea: v.forestArea, type: v.type} })
    )(nde.fra)

    const xScale = getXScale(data)
    const yScale = getYScale(data)

    return {data, xScale, yScale}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
