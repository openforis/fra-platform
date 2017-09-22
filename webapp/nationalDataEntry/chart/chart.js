import * as d3 from 'd3'
import R from 'ramda'

export const styles = {
  height: 330,
  top: 30,
  left: 65,
  bottom: 30
}

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = width => {
  return d3.scaleLinear()
    .domain([1989, 2021])
    .range([styles.left, width])
}

const yMaxValue = 98765
// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = data => {
  const max = R.pipe(
    R.map(o => d3.max(o, d => d.value)),
    R.values,
    o => d3.max(o, d => d),
    R.defaultTo(yMaxValue),
    v => v > 0 ? v : yMaxValue
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

export const getTrendOdps = trend => R.filter(v => v.type === 'odp', trend)

export const formatNumber = v => d3.format(',')(v).replace(/,/g, ' ')

export const defaultTransitionDuration = 400
