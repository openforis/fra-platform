import { RefObject, useCallback } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'

type Props = {
  containerRef: RefObject<SVGGElement>
  toucanHeight: number
}

type Returned = () => void

export const useHidePlaceholder = (props: Props): Returned => {
  const { containerRef, toucanHeight } = props

  return useCallback<Returned>(() => {
    const delay = 50
    d3.select(containerRef.current)
      .select('image')
      .transition()
      .duration(Charts.transitionDuration)
      .delay(delay)
      .style('transform', `translateY(-${toucanHeight}px)`)
      .ease(d3.easeBounceIn)

    d3.select(containerRef.current)
      .selectAll('text')
      .transition()
      .duration((Charts.transitionDuration / 2) * 3)
      .style('opacity', '0')

    d3.select(containerRef.current)
      .transition()
      .duration(Charts.transitionDuration)
      .delay(delay)
      .ease(d3.easeBackInOut)
      .style('opacity', '0')
      .transition()
      .style('visibility', 'hidden')
  }, [containerRef, toucanHeight])
}
