import { useMemo } from 'react'

import * as d3 from 'd3'
import { ScaleLinear } from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { ChartProps, TrendsYears } from 'client/pages/Section/DataTable/Chart/types'

type Props = Pick<ChartProps, 'width'> & {
  years?: TrendsYears
}

export const useXScale = (props: Props): ScaleLinear<number, number> => {
  const { width, years } = props

  return useMemo<ScaleLinear<number, number>>(() => {
    return d3.scaleLinear().domain([years?.min, years?.max]).range([Charts.styles.left, width])
  }, [width, years?.max, years?.min])
}
