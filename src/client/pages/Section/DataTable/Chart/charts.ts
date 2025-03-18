import { RecordTrendData } from './types'

/**
 * @deprecated
 */
type Trend = {
  dataSourceMethods?: any
  type: string
  value: number
  year: number
}
/**
 * @deprecated
 */
type Trends = Trend[]

/**
 * @deprecated. Use Charts.styles
 */
export const styles = {
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
  transitionDuration: 400,
}

/**
 * @deprecated
 */
export const getChartYears = (data: any[]) => {
  // @ts-ignore
  const handleData = (d) => (Array.isArray(d) ? d.flatMap((x: any) => x.year) : d.year)
  const years: number[] = Object.values(data).flatMap(handleData)
  if (years.length > 0) {
    const min = Math.min(...years) - 1
    const max = Math.max(...years) + 1
    return { min, max }
  }
  return {}
}

/**
 * @deprecated
 */
export const getTrendOdps = (trend: Trends) => trend.filter((t) => t.type === 'odp')

/**
 * @deprecated
 */
export const defaultTransitionDuration = 400
