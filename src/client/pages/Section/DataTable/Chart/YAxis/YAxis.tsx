import React, { useRef } from 'react'

import { ChartProps, D3ChartAxisScale, RecordTrendData } from 'client/pages/Section/DataTable/Chart/types'

import { useD3YAxis } from './hooks/useD3YAxis'
import { useD3YAxisTransition } from './hooks/useD3YAxisTransition'

type Props = Pick<ChartProps, 'width'> & {
  trendsData: RecordTrendData
  yScale: D3ChartAxisScale
}

const YAxis: React.FC<Props> = (props) => {
  const { trendsData, width, yScale } = props

  const axisRef = useRef<SVGGElement>()
  const unitLabelRef = useRef<SVGTextElement>()
  const d3Axis = useD3YAxis({ axisRef, yScale, width })
  useD3YAxisTransition({ d3Axis, trendsData, unitLabelRef })

  return (
    <g className="chart__y-axis">
      <text ref={unitLabelRef} style={{ fill: '#666666', fontSize: '11px', opacity: 0 }} x="17" y="14">
        1000 ha
      </text>
      <g ref={axisRef} />
    </g>
  )
}

export default YAxis
