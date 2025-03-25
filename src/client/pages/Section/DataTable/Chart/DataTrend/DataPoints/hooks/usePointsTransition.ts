import { RefObject, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, Trend, TrendData } from 'client/pages/Section/DataTable/Chart/types'

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

  const { getCX, getCY, getFill, getR, getStroke } = usePointsStyleFNs({ trend, xScale, yScale })
  const tooltip = usePointsTooltip({ containerRef, trend })

  useLayoutEffect(() => {
    const circle = d3.select(containerRef.current).selectAll('circle').data(data)

    // update
    circle
      .transition()
      .duration(Charts.transitions.dataPoints)
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
      .duration(Charts.transitions.dataPoints)
      .ease(d3.easeCircle)
      .attr('cy', () => yScale(0))
      .style('opacity', '0')
      .remove()

    // enter
    circle
      .enter()
      .append('circle')
      .on('mouseover', tooltip?.show)
      .on('mouseout', tooltip?.hide)
      .attr('r', 0)
      // .attr('cx', () => xScale(1990))
      .attr('cx', getCX)
      // .attr('cy', () => yScale(0))
      .style('fill', '#ffffff')
      .transition()
      .duration(Charts.transitions.dataPoints)
      .ease(d3.easeBounceIn)
      .attr('cx', getCX)
      .attr('cy', getCY)
      .attr('r', getR)
      .style('fill', getFill)
      .style('stroke', getStroke)
      .style('stroke-width', '1.5')
      .style('opacity', '1')
  }, [containerRef, data, getCX, getCY, getFill, getR, getStroke, tooltip, yScale])
}
