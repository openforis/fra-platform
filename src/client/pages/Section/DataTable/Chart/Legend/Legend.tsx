import './Legend.scss'
import React, { useRef } from 'react'
import classNames from 'classnames'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { ChartProps, RecordTrendData, Trends } from 'client/pages/Section/DataTable/Chart/types'

import { useLegendTransition } from './hooks/useLegendTransition'
import { _getLegendTrendClassName } from './_getLegendTrendClassName'

type Props = Pick<ChartProps, 'width'> & {
  trends: Trends
  trendsData: RecordTrendData
}

const offset = 8

const Legend: React.FC<Props> = (props) => {
  const { trends, trendsData, width } = props

  const containerRef = useRef<HTMLDivElement>(null)
  useLegendTransition({ containerRef, trends, trendsData })

  return (
    <foreignObject height="20px" width={width - Charts.styles.left - offset} x={Charts.styles.left + offset} y="0">
      <div ref={containerRef} className="chart__legend-wrapper">
        {trends.map((trend) => {
          const { color, label, name: trendName } = trend
          const className = _getLegendTrendClassName({ trendName })
          return (
            <div key={trendName} className={classNames('chart__legend-item', className)} style={{ opacity: 0 }}>
              <div className="chart__legend-item-color" style={{ backgroundColor: color }} />
              <div className="chart__legend-item-label">{label}</div>
            </div>
          )
        })}
      </div>
    </foreignObject>
  )
}
export default Legend
