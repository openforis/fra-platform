import { RefObject, useLayoutEffect, useMemo } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3YAxis, RecordTrendData } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  d3Axis: D3YAxis
  trendsData: RecordTrendData
  unitLabelRef: RefObject<SVGTextElement>
}
export const useD3YAxisTransition = (props: Props): void => {
  const { d3Axis, trendsData, unitLabelRef } = props

  const hasData = useMemo<boolean>(() => Charts.hasData({ trendsData }), [trendsData])

  useLayoutEffect(() => {
    d3Axis
      .selectAll('text')
      .transition()
      .ease(d3.easePolyOut)
      .duration(Charts.transitionDuration)
      .attrTween('fill', () =>
        // hasData -> enter / otherwise update
        hasData ? d3.interpolateRgb('#ffffff', '#666666') : d3.interpolateRgb('#666666', '#666666')
      )

    // exit
    if (!hasData) d3Axis.selectAll('text').remove()

    d3Axis
      .transition()
      .ease(d3.easePolyOut)
      .duration(Charts.transitionDuration)
      .attr('transform', () => `translate(${hasData ? Charts.styles.left : '0'}, 0)`)
    d3.select(unitLabelRef.current)
      .transition()
      .ease(d3.easePolyOut)
      .delay(100)
      .duration(Charts.transitionDuration)
      .style('opacity', () => (hasData ? 1 : 0))
  }, [d3Axis, hasData, unitLabelRef])
}
