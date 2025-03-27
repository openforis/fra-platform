import { useCallback } from 'react'

import { D3ChartAxisScale, Trend, TrendDatum } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

type Returned = {
  getCX: (datum: TrendDatum) => ReturnType<D3ChartAxisScale>
  getCY: (datum: TrendDatum) => ReturnType<D3ChartAxisScale>
  getFill: (datum: TrendDatum) => string
  getR: (datum: TrendDatum) => number
  getStroke: (datum: TrendDatum) => string
}

export const usePointsStyleFNs = (props: Props): Returned => {
  const { trend, xScale, yScale } = props
  const { color } = trend

  const getCX = useCallback<Returned['getCX']>(
    (datum) => {
      return xScale(datum.year)
    },
    [xScale]
  )

  const getCY = useCallback<Returned['getCX']>(
    (datum) => {
      return yScale(datum.value)
    },
    [yScale]
  )

  const getFill = useCallback<Returned['getFill']>(
    (datum) => {
      return datum.type === 'fra' ? '#ffffff' : color
    },
    [color]
  )

  const getR = useCallback<Returned['getR']>((datum) => {
    return datum.type === 'odp' ? 4.5 : 6.5
  }, [])

  const getStroke = useCallback<Returned['getStroke']>((datum) => {
    return datum.type === 'fra' ? '#333333' : '#ffffff'
  }, [])

  return { getCX, getCY, getFill, getR, getStroke }
}
