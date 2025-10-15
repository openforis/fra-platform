import { RefObject, useLayoutEffect, useMemo } from 'react'

import * as d3 from 'd3'
import { Objects } from 'utils/objects'

import { useIsPrintRoute } from 'client/hooks/routes'
import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3YAxis, RecordTrendData } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  d3Axis: D3YAxis
  trendsData: RecordTrendData
  unitLabelRef: RefObject<SVGTextElement>
}

export const useD3YAxisTransition = (props: Props): void => {
  const { d3Axis, trendsData, unitLabelRef } = props

  const { print } = useIsPrintRoute()
  const hasData = useMemo<boolean>(() => Charts.hasData({ trendsData }), [trendsData])

  useLayoutEffect(() => {
    const duration = print ? 0 : Charts.transitions.yAxis
    const delay = print ? 0 : 100

    if (!Objects.isNil(d3Axis)) {
      d3Axis
        .selectAll('text')
        .transition()
        .ease(d3.easePolyOut)
        .duration(duration)
        .attrTween('fill', () =>
          // hasData -> enter / otherwise update
          hasData ? d3.interpolateRgb('#ffffff', '#666666') : d3.interpolateRgb('#666666', '#666666')
        )

      // exit
      if (!hasData) d3Axis.selectAll('text').remove()

      d3Axis
        .transition()
        .ease(d3.easePolyOut)
        .duration(duration)
        .attr('transform', () => `translate(${hasData ? Charts.styles.left : '0'}, 0)`)
      d3.select(unitLabelRef.current)
        .transition()
        .ease(d3.easePolyOut)
        .delay(delay)
        .duration(duration)
        .style('opacity', () => (hasData ? 1 : 0))
    }
  }, [d3Axis, hasData, print, unitLabelRef])
}
