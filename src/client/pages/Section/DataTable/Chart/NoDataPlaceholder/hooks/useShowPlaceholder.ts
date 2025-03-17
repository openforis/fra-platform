import { RefObject, useCallback } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'

type Props = {
  containerRef: RefObject<SVGGElement>
}

type Returned = () => void

export const useShowPlaceholder = (props: Props): Returned => {
  const { containerRef } = props

  return useCallback<Returned>(() => {
    d3.select(containerRef.current).transition().style('visibility', 'visible').style('opacity', '1')

    d3.select(containerRef.current)
      .select('image')
      .transition()
      .duration(Charts.transitionDuration)
      .style('opacity', '1')
      .style('transform', `translateY(0)`)
      .ease(d3.easeBounceOut)

    d3.select(containerRef.current)
      .selectAll('text')
      .transition()
      .delay(100)
      .duration(Charts.transitionDuration * 2)
      .style('opacity', '1')
  }, [containerRef])
}
