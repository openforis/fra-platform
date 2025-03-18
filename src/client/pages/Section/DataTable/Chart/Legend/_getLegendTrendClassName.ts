import { TrendName } from 'client/pages/Section/DataTable/Chart/types'

export const _getLegendTrendClassName = (props: { trendName: TrendName }): string => `legend-${props.trendName}`
