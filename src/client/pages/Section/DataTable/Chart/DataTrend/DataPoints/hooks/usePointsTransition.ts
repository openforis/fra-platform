import { RefObject, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, Trend, TrendData, TrendDatum } from 'client/pages/Section/DataTable/Chart/types'

import { usePointsStyleFNs } from './usePointsStyleFNs'
import { usePointsTooltip } from './usePointsTooltip'

type Props = {
  containerRef: RefObject<SVGGElement>
  data: TrendData
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

export const usePointsTransition = (props: Props): void => {
  const { containerRef, data, trend, xScale, yScale } = props

  const { print } = useIsPrintRoute()
  const { getCX, getCY, getFill, getR, getStroke } = usePointsStyleFNs({ trend, xScale, yScale })
  const tooltip = usePointsTooltip({ containerRef, trend })

  useLayoutEffect(() => {
    const duration = print ? 0 : Charts.transitions.dataPoints
    const circle = d3.select(containerRef.current).selectAll('circle').data<TrendDatum>(data)

    // init mouseover/out tooltip
    circle.on('mouseover', tooltip?.show).on('mouseout', tooltip?.hide)

    // update
    circle
      .transition()
      .duration(duration)
      .ease(d3.easeCircle)
      .attr('cx', getCX)
      .attr('cy', getCY)
      .attr('r', getR)
      .style('fill', getFill)
      .style('stroke', getStroke)
      .style('stroke-width', '1.5')
      .style('opacity', '1')

    // exit
    circle
      .exit()
      .transition()
      .duration(duration)
      .ease(d3.easeCircle)
      .attr('cy', () => yScale(0))
      .style('opacity', '0')
      .remove()

    // enter
    circle
      .enter()
      .append('circle')
      .attr('r', 0)
      // .attr('cx', () => xScale(1990))
      .attr('cx', getCX)
      // .attr('cy', () => yScale(0))
      .style('fill', '#ffffff')
      .transition()
      .duration(duration)
      .ease(d3.easeBounceIn)
      .attr('cx', getCX)
      .attr('cy', getCY)
      .attr('r', getR)
      .style('fill', getFill)
      .style('stroke', getStroke)
      .style('stroke-width', '1.5')
      .style('opacity', '1')
  }, [containerRef, data, getCX, getCY, getFill, getR, getStroke, print, tooltip, yScale])
}
