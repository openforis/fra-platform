import { useMemo } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { ChartProps, D3ChartAxisScale, TrendsYears } from 'client/pages/Section/DataTable/Chart/types'

type Props = Pick<ChartProps, 'width'> & {
  years?: TrendsYears
}

export const useXScale = (props: Props): D3ChartAxisScale => {
  const { width, years } = props

  return useMemo<D3ChartAxisScale>(() => {
    return d3.scaleLinear().domain([years?.min, years?.max]).range([Charts.styles.left, width])
  }, [width, years?.max, years?.min])
}
