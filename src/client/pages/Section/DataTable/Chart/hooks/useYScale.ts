import { useMemo } from 'react'

import * as d3 from 'd3'
import { ScaleLinear } from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { RecordTrendData } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  trendsData: RecordTrendData
}

type Returned = ScaleLinear<number, number>

const yMaxValue = 98765

export const useYScale = (props: Props): Returned => {
  const { trendsData } = props
  return useMemo<Returned>(() => {
    const values = Object.values(trendsData).flatMap((trendData) => trendData.map((data) => data.value))
    const max = Math.max(...values)
    const min = Math.min(...values)

    return d3
      .scaleLinear()
      .domain([min > 0 ? 0 : min, max > 0 ? max : yMaxValue])
      .range([Charts.styles.height - Charts.styles.bottom, Charts.styles.top])
  }, [trendsData])
}
