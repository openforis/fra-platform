import React, { RefObject, useLayoutEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import { useTranslation } from 'react-i18next'
import * as d3 from 'd3'
import { Selection, Tooltip } from 'd3'
import d3Tip from 'd3-tip'
import { TFunction } from 'i18next'

import { Numbers } from 'utils/numbers'

import { Trend, TrendDatum } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  containerRef: RefObject<SVGGElement>
  trend: Trend
}

type PropsGetHtml = { datum: TrendDatum; t: TFunction; trend: Trend }

type TooltipSelection = (selection: Selection<SVGGElement, unknown, null, undefined>) => void

const _getHtml = (props: PropsGetHtml): string => {
  const { datum, t, trend } = props
  const { color } = trend

  return renderToString(
    <div className="chart__tooltip-container">
      <div className="chart__tooltip-heading">
        <div className="chart__tooltip-marker" style={{ backgroundColor: datum.type === 'fra' ? '#ffffff' : color }} />
        <div>{datum.year}</div>
      </div>
      <div className="chart__tooltip-value-container">
        <div className="chart__tooltip-value">{Numbers.format(datum.value)}</div>
        <div>({t('unit.haThousand')})</div>
      </div>

      {datum.dataSourceMethods && (
        <div className="chart__tooltip-methods">
          <div className="chart__tooltip-heading">{t('nationalDataPoint.methodsUsed')}</div>
          {datum.dataSourceMethods.map((dataSourceMethod) => (
            <div key={dataSourceMethod} className="chart__tooltip-data-source">
              {t(`nationalDataPoint.dataSourceMethodsOptions.${dataSourceMethod}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const usePointsTooltip = (props: Props): Tooltip => {
  const { containerRef, trend } = props

  const { t } = useTranslation()
  const tooltipRef = useRef<Tooltip>(null)

  useLayoutEffect(() => {
    const tooltip = (d3Tip as typeof d3.tip)()
      .attr('class', 'chart__tooltip')
      .offset([-10, 0])
      .html<TrendDatum>((_e, datum) => _getHtml({ datum, t, trend }))

    d3.select(containerRef?.current).call(tooltip as unknown as TooltipSelection)
    tooltipRef.current = tooltip
  }, [containerRef, t, trend])

  return tooltipRef.current
}
