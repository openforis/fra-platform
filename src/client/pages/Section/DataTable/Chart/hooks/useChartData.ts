import * as Chart from '../chart'

export default (data: any, trends: any, width: any) => {
  const _chartData = trends.reduce(
    (dataAccumulator: any, { name }: any) => ({
      ...dataAccumulator,
      [name]: Chart.getChartData(data, name),
    }),
    {}
  )
  const xScale = Chart.getXScale(width, data)
  const yScale = Chart.getYScale(data, trends)

  return { chartData: _chartData, xScale, yScale }
}
