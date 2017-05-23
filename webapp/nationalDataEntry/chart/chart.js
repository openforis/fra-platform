import React, { Component } from 'react'
import * as d3 from 'd3'
import DataCircles from './data-circles'
import XYAxis from './x-y-axis'

const styles = {
  width: 500,
  height: 300,
  padding: 30
}

const numDataPoints = 50

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000)

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()])
}

// Returns the largest X coordinate from the data set
const xMax = (data) => d3.max(data, (d) => d[0])

// Returns the highest Y coordinate from the data set
const yMax = (data) => d3.max(data, (d) => d[1])

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (data) => {
  return d3.scaleLinear()
    .domain([0, xMax(data)])
    .range([styles.padding, styles.width - styles.padding * 2])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (data) => {
  return d3.scaleLinear()
    .domain([0, yMax(data)])
    .range([styles.height - styles.padding, styles.padding])
}

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {data: randomDataSet(), ...styles}
  }

  render () {

    const data = randomDataSet()
    const scales = {xScale: xScale(data), yScale: yScale(data)}

    return <div>
      <h1>Chart!</h1>
      <svg width={styles.width} height={styles.height}>
        <DataCircles {...this.state} {...scales} />
        <XYAxis {...this.state} {...scales} />
      </svg>
    </div>
  }
}

export default Chart
