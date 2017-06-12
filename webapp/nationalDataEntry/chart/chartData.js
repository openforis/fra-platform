import * as d3 from 'd3'
import R from 'ramda'

const documentWidth = window.innerWidth

export const styles = {
  width: documentWidth - 328,
  height: 320,
  padding: 64
}

// Returns the highest Y coordinate from the data set
export const yMax = (forestArea, otherWoodedLand) => R.max(d3.max(forestArea, (d) => d.value), d3.max(otherWoodedLand, (d) => d.value))

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = () => {
  return d3.scaleLinear()
    .domain([1989, 2021])
    .range([styles.padding, styles.width])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = (data) => {
  let max = yMax(data.forestArea, data.otherWoodedLand)
  max = max ? max : 98765

  return d3.scaleLinear()
    .domain([0, max])
    .range([styles.height - (styles.padding/2), styles.padding/2])
}

export const getChartData = (fra, property) => {
  return R.pipe(
    R.values,
    R.filter(v => typeof v[property] === 'number'),
    R.map((v) => { return {year: v.year, value: v[property], type: v.type, estimated: v[`${property}Estimated`]} })
  )(fra)
}
