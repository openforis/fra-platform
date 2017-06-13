import * as d3 from 'd3'
import R from 'ramda'

export const styles = {
  height: 320,
  top: 24,
  left: 64,
  bottom: 32
}

// Returns the highest Y coordinate from the data set
export const yMax = (forestArea, otherWoodedLand) => R.max(d3.max(forestArea, (d) => d.value), d3.max(otherWoodedLand, (d) => d.value))

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = (props) => {
  return d3.scaleLinear()
    .domain([1989, 2021])
    .range([styles.left, props.wrapperWidth])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = (data, props) => {
  let max = yMax(data.forestArea, data.otherWoodedLand)
  max = max ? max : 98765

  return d3.scaleLinear()
    .domain([0, max])
    .range([styles.height - styles.bottom, styles.top])
}

export const getChartData = (fra, property) => {
  return R.pipe(
    R.values,
    R.filter(v => typeof v[property] === 'number'),
    R.map((v) => { return {year: v.year, value: v[property], type: v.type, estimated: v[`${property}Estimated`]} })
  )(fra)
}
