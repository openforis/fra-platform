import * as d3 from 'd3'
import R from 'ramda'

export const styles = {
  height: 320,
  top: 24,
  left: 64,
  bottom: 32
}

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = width => {
  return d3.scaleLinear()
    .domain([1989, 2021])
    .range([styles.left, width])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = data => {
  const max = R.pipe(
    R.map(o => d3.max(o, d => d.value)),
    R.values,
    o => d3.max(o, d => d),
    v => v ? v : 98765
  )(data)

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

export const hasData = data => R.pipe(
  R.map(d => d.length),
  R.values,
  R.any(v => v > 0)
)(data)
