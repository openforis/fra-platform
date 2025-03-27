import React, { useMemo, useRef } from 'react'

import { D3ChartAxisScale, TrendData } from 'client/pages/Section/DataTable/Chart/types'

import { useOdpTicksTransition } from './hooks/useOdpTicksTransition'

type Props = {
  trendData: TrendData
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

const OdpTicks: React.FC<Props> = (props) => {
  const { trendData: _trendData, xScale, yScale } = props

  const containerRef = useRef<SVGGElement>()
  const trendData = useMemo<TrendData>(() => _trendData.filter((datum) => datum.type === 'odp'), [_trendData])
  useOdpTicksTransition({ containerRef, trendData, xScale, yScale })

  return <g ref={containerRef} />
}
export default OdpTicks
