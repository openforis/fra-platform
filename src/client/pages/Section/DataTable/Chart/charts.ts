import { RecordTrendData } from './types'

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
 * use Charts.transitionDuration
 */
export const defaultTransitionDuration = 400
