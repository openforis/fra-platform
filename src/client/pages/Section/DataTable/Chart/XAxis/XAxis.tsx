import React, { useRef } from 'react'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, TrendsYears } from 'client/pages/Section/DataTable/Chart/types'

import { useRenderD3XAxis } from './hooks/useRenderD3XAxis'

type Props = {
  xScale: D3ChartAxisScale
  years?: TrendsYears
}

const XAxis: React.FC<Props> = (props) => {
  const { xScale, years } = props

  const axisRef = useRef<SVGGElement>()
  useRenderD3XAxis({ axisRef, xScale, years })

  return <g ref={axisRef} transform={`translate(0, ${Charts.styles.height - Charts.styles.bottom})`} />
}

export default XAxis
