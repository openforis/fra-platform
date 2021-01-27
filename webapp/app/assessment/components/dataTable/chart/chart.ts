// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3'.... Remove this comment to see the full error message
import * as d3 from 'd3'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const styles = {
  height: 330,
  top: 30,
  left: 65,
  bottom: 30,
}

export const getChartYears = (data: any) => {
  const min = R.pipe(
    R.map((o: any) => d3.min(o, (d: any) => d.year)),
    R.values,
    (o: any) => d3.min(o, (d: any) => d),
    R.subtract(R.__, 1)
  )(data)

  const max = R.pipe(
    R.map((o: any) => d3.max(o, (d: any) => d.year)),
    R.values,
    (o: any) => d3.max(o, (d: any) => d),
    R.add(R.__, 1)
  )(data)

  return { min, max }
}

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = (width: any, data: any) => {
  const chartYears = getChartYears(data)

  return d3.scaleLinear().domain([chartYears.min, chartYears.max]).range([styles.left, width])
}

const yMaxValue = 98765
// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = (data: any) => {
  const max = R.pipe(
    R.map((o: any) => d3.max(o, (d: any) => d.value)),
    R.values,
    (o: any) => d3.max(o, (d: any) => d),
    R.defaultTo(yMaxValue),
    (v: any) => (v > 0 ? v : yMaxValue)
  )(data)

  return d3
    .scaleLinear()
    .domain([0, max])
    .range([styles.height - styles.bottom, styles.top])
}

export const getChartData = (fra: any, property: any) => {
  return R.pipe(
    R.values,
    R.reject((v: any) => R.isNil(v[property])),
    R.map((v: any) => ({
      year: Number(v.year),
      value: Number(v[property]),
      type: v.type,
      estimated: v[`${property}Estimated`],
      dataSourceMethods: v.dataSourceMethods,
    }))
  )(fra)
}

export const hasData = (data: any) =>
  R.pipe(
    R.map((d: any) => d.length),
    R.values,
    R.any((v: any) => v > 0)
  )(data)

export const getTrendOdps = (trend: any) => R.filter((v: any) => v.type === 'odp', trend)

export const defaultTransitionDuration = 400
