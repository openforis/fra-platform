import { RecordTrendData } from './types'

const styles = {
  height: 390,
  top: 32,
  left: 65,
  bottom: 32,
}

const hasData = (props: { trendsData: RecordTrendData }) => {
  const { trendsData } = props
  return Object.values(trendsData).some((trendData) => trendData.length > 0)
}

export const Charts = {
  hasData,
  styles,
  transitions: {
    dataPath: 500,
    dataPoints: 750,
    legend: 1000,
    odpTicks: 500,
    placeholder: 500,
    yAxis: 500,
  },
}
