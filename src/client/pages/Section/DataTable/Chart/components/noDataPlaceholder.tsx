import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import * as d3 from 'd3'

import { usePrevious } from 'client/hooks'

import { defaultTransitionDuration, hasData as _hasData } from '../chart'

const toucanY = 20
const toucanWidth = 62
const toucanHeight = 87

type Props = {
  wrapperWidth: number
  data: Record<string, unknown>
}

const NoDataPlaceholder = (props: Props) => {
  const { data, wrapperWidth } = props
  const { t } = useTranslation()
  const container = useRef(null)
  const hasData = _hasData(data)
  const previousHasData = usePrevious(hasData, hasData)

  const _getD3Container = () => {
    return d3.select(container.current)
  }

  const hidePlaceholderAnimated = useCallback(() => {
    _getD3Container()
      .transition()
      .duration(defaultTransitionDuration)
      .delay(100)
      .ease(d3.easeBackInOut)
      .attr('y', -toucanHeight)
      .style('opacity', '0')
      .transition()
      .style('visibility', 'hidden')
  }, [])

  const hidePlaceholder = useCallback(() => {
    _getD3Container().transition().duration(100).style('visibility', 'hidden').style('opacity', '0')
  }, [])

  const showPlaceholder = useCallback(() => {
    _getD3Container().attr('y', toucanY).transition().duration(100).style('visibility', 'visible').style('opacity', '1')
  }, [])

  useEffect(() => {
    if (!_hasData(data)) showPlaceholder()
    else if (!previousHasData && hasData) hidePlaceholderAnimated()
    else hidePlaceholder()

    return () => {
      hidePlaceholder()
    }
  }, [data, hasData, hidePlaceholder, hidePlaceholderAnimated, previousHasData, showPlaceholder])

  const centerX = wrapperWidth / 2
  const textY = toucanY + toucanHeight

  return (
    <g className="chart__no-data-placeholder" ref={container}>
      <image
        href="/img/tucan.svg"
        width={toucanWidth}
        height={toucanHeight}
        x={(wrapperWidth - toucanWidth) / 2}
        y={toucanY}
      />
      <g>
        <text dominantBaseline="middle" textAnchor="middle" x={centerX} y={textY + 20}>
          {t('extentOfForest.chart.placeholderLine1')}
        </text>
        <text dominantBaseline="middle" textAnchor="middle" x={centerX} y={textY + 40}>
          {t('extentOfForest.chart.placeholderLine2')}
        </text>
      </g>
    </g>
  )
}

export default NoDataPlaceholder
