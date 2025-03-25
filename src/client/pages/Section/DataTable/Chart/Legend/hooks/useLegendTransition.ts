import { RefObject, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { RecordTrendData, Trends } from 'client/pages/Section/DataTable/Chart/types'

import { _getLegendTrendClassName } from '../_getLegendTrendClassName'

type Props = {
  containerRef: RefObject<HTMLDivElement>
  trends: Trends
  trendsData: RecordTrendData
}

export const useLegendTransition = (props: Props): void => {
  const { containerRef, trends, trendsData } = props

  useLayoutEffect(() => {
    trends.forEach((trend) => {
      const { name: trendName } = trend
      const trendData = trendsData[trendName]
      const hasData = Charts.hasData({ trendsData: { [trendName]: trendData } })
      const className = _getLegendTrendClassName({ trendName })

      d3.select(containerRef.current)
        .select(`.${className}`)
        .transition()
        .duration(Charts.transitions.legend)
        .ease(d3.easePolyOut)
        .style('width', hasData ? 'auto' : '0')
        .style('opacity', hasData ? '1' : '0')
    })
  }, [containerRef, trends, trendsData])
}
