import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { ChartProps, RecordTrendData } from 'client/pages/Section/DataTable/Chart/types'

import { useHidePlaceholder } from './hooks/useHidePlaceholder'
import { useShowPlaceholder } from './hooks/useShowPlaceholder'

const toucanY = 95
const toucanWidth = 62
const toucanHeight = 87
const textY = toucanY + toucanHeight

type Props = Pick<ChartProps, 'width'> & {
  trendsData: RecordTrendData
}

const NoDataPlaceholder = (props: Props) => {
  const { trendsData, width } = props

  const { t } = useTranslation()
  const containerRef = useRef<SVGGElement>()
  const hidePlaceholder = useHidePlaceholder({ containerRef, toucanHeight })
  const showPlaceholder = useShowPlaceholder({ containerRef })
  const hasData = useMemo<boolean>(() => Charts.hasData({ trendsData }), [trendsData])
  const centerX = useMemo<number>(() => width / 2, [width])

  useLayoutEffect(() => {
    if (hasData) {
      hidePlaceholder()
    } else {
      showPlaceholder()
    }
  }, [hasData, hidePlaceholder, showPlaceholder])

  return (
    <g ref={containerRef} className="chart__no-data-placeholder">
      <defs>
        <filter height="1" id="solid" width="1" x="0" y="0">
          <feFlood floodColor="rgba(247,247,247,0.2)" result="bg" />
          <feMerge>
            <feMergeNode in="bg" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <image
        height={toucanHeight}
        href="/img/tucan.svg"
        style={{ opacity: `0`, transform: `translateY(-${(toucanHeight * 2) / 3}px)` }}
        width={toucanWidth}
        x={(width - toucanWidth) / 2}
        y={toucanY}
      />
      <g>
        <text dominantBaseline="middle" style={{ opacity: 0 }} textAnchor="middle" x={centerX} y={textY + 10}>
          {t('extentOfForest.chart.placeholderLine1')}
        </text>
        <text dominantBaseline="middle" style={{ opacity: 0 }} textAnchor="middle" x={centerX} y={textY + 30}>
          {t('extentOfForest.chart.placeholderLine2')}
        </text>
      </g>
    </g>
  )
}

export default NoDataPlaceholder
