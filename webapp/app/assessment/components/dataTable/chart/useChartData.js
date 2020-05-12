import * as Chart from './chart'

export default (fra, trends, width) => {
  const data = trends.reduce(
    (dataAccumulator, { name }) => ({
      ...dataAccumulator,
      [name]: Chart.getChartData(fra, name),
    }),
    {}
  )

  const xScale = Chart.getXScale(width, data)
  const yScale = Chart.getYScale(data)

  return { data, xScale, yScale }
}
