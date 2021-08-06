import * as Chart from './chart'

export default (fra: any, trends: any, width: any) => {
  const data = trends.reduce(
    (dataAccumulator: any, { name }: any) => ({
      ...dataAccumulator,
      [name]: Chart.getChartData(fra, name),
    }),
    {}
  )

  const xScale = Chart.getXScale(width, data)
  const yScale = Chart.getYScale(data)

  return { data, xScale, yScale }
}
