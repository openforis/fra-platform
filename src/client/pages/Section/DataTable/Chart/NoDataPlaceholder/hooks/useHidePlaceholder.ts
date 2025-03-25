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
      .duration(Charts.transitions.placeholder)
      .delay(delay)
      .style('transform', `translateY(-${toucanHeight * 3}px)`)
      .ease(d3.easeBackInOut)

    d3.select(containerRef.current)
      .selectAll('text')
      .transition()
      .duration(Charts.transitions.placeholder / 2)
      .style('opacity', '0')

    d3.select(containerRef.current)
      .transition()
      .duration(Charts.transitions.placeholder)
      .delay(delay)
      .style('opacity', '0')
      .transition()
      .style('visibility', 'hidden')
  }, [containerRef, toucanHeight])
}
