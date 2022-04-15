import * as d3 from 'd3'
import * as R from 'ramda'

export const styles = {
  height: 330,
  top: 30,
  left: 65,
  bottom: 30,
}

export const getChartYears = (data: any[]) => {
  const years: number[] = Object.values(data).map((d: any) => d.year)
  const min = Math.min(...years) - 1
  const max = Math.max(...years) + 1

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
  console.log('----------', { data })
  const values: any[] = Object.values(data)
    .flatMap((x) => Object.values(x))
    .map(Number)
    .filter((d) => d)
  const max = values.length > 0 ? Math.max(...values) : yMaxValue
  console.log(values, max)
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
