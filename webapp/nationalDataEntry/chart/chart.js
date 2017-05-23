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
  padding: 50
}

// Returns the highest Y coordinate from the data set
const yMax = (data) => d3.max(data, (d) => d[1])

// Returns a function that "scales" X coordinates from the data to fit the chart
const getXScale = (data) => {
  return d3.scaleLinear()
    .domain([1990, 2020])
    .range([styles.padding, styles.width - styles.padding * 2])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
const getYScale = (data) => {
  return d3.scaleLinear()
    .domain([0, yMax(data)])
    .range([styles.height - styles.padding, styles.padding])
}

class Chart extends Component {

  render () {
    return <div ref="chartContainer">
      {this.props.data ? <svg width={styles.width} height={styles.height}>
        <DataCircles {...this.props} {...styles} />
        <XAxis {...this.props} {...styles} />
        <YAxis {...this.props} {...styles} />
      </svg>
        : <div>loading...</div>}
    </div>
  }
}

const mapStateToProps = state => {
  const nde = state['nationalDataEntry']
  if (nde) {
    const data = R.pipe(
      R.values,
      R.map((v) => [v.year, v.forestArea])
    )(nde.fra)

    const xScale = getXScale(data)
    const yScale = getYScale(data)

    return {data, xScale, yScale}
  }
}

export default connect(mapStateToProps)(Chart)
