import { RefObject, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { useIsPrintRoute } from 'client/hooks/routes'
import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, TrendData, TrendDatum } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  containerRef: RefObject<SVGGElement>
  trendData: TrendData
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

export const useOdpTicksTransition = (props: Props): void => {
  const { containerRef, trendData, xScale, yScale } = props

  const { print } = useIsPrintRoute()

  useLayoutEffect(() => {
    const duration = print ? 0 : Charts.transitions.odpTicks
    const delay = print ? 0 : Charts.transitions.odpTicks / 2

    const lines = d3.select(containerRef.current).selectAll('line').data<TrendDatum>(trendData)

    // update
    lines
      .transition()
      .delay(delay)
      .duration(duration)
      .ease(d3.easeLinear)
      .attr('x1', (d) => xScale(d.year))
      .attr('y1', () => yScale(0))
      .attr('x2', (d) => xScale(d.year))
      .attr('y2', (d) => yScale(d.value))
      .style('opacity', '1')

    // exit
    lines
      .exit()
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr('y2', () => yScale(0))
      .style('opacity', '0')
      .remove()

    // enter
    lines
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.year))
      .attr('y1', () => yScale(0))
      .attr('x2', (d) => xScale(d.year))
      .attr('y2', () => yScale(0))
      .style('opacity', 0)
      .style('stroke', '#cccccc')
      .style('stroke-width', 1)
      .transition()
      .delay(delay)
      .duration(duration)
      .ease(d3.easeLinear)
      .attr('y2', (d) => yScale(d.value))
      .style('opacity', '1')
  }, [containerRef, print, trendData, xScale, yScale])
}
