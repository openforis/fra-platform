import * as d3 from 'd3'

type Trend = {
  dataSourceMethods: any
  type: string
  value: number
  year: number
}
type Trends = Trend[]

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
  const values = Object.values(data)
    .flatMap((x) => Object.values(x))
    .map(Number)
    .filter((d) => d)
  const max = values.length > 0 ? Math.max(...values) : yMaxValue
  return d3
    .scaleLinear()
    .domain([0, max])
    .range([styles.height - styles.bottom, styles.top])
}

export const getChartData = (data: any, property: any) => {
  const toChartDataObj = (v: any) => ({
    year: Number(v.year),
    value: Number(v[property]),
    type: v.type,
    estimated: v[`${property}Estimated`],
    dataSourceMethods: v.dataSourceMethods,
  })
  return data.filter((d: Record<string, string>) => !!d[property]).map(toChartDataObj)
}

export const hasData = (data: any) =>
  Object.values(data)
    .map((x: any[]) => x.length > 0)
    .some((z) => z)
export const getTrendOdps = (trend: Trends) => trend.filter((t) => t.type === 'odp')

export const defaultTransitionDuration = 400
