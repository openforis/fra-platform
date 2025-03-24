import { RefObject, useCallback, useLayoutEffect, useMemo, useRef } from 'react'

import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'
import { Functions } from 'utils/functions'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, Trend, TrendData } from 'client/pages/Section/DataTable/Chart/types'

import { usePathProps } from './usePathProps'

type Props = {
  data: TrendData
  trend: Trend
  pathRef: RefObject<SVGPathElement>
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

export const usePathTransition = (props: Props): void => {
  const { data, trend, pathRef, xScale, yScale } = props

  const { hasData, hasDiffs, pathNext, pathPrev } = usePathProps({ data, trend, pathRef, xScale, yScale })
  const firstTransition = useRef<boolean>(true)

  const transition = useCallback(
    (next: string, prev: string, opacity: number) => {
      let duration = Charts.transitions.dataPath * 2
      if (!firstTransition.current) duration /= 2

      d3.select(pathRef.current)
        .transition()
        .ease(d3.easeCubic)
        .duration(duration)
        .attrTween('d', () => interpolatePath(prev, next))
        .style('opacity', opacity)
    },
    [pathRef]
  )
  const throttleTransition = useMemo(() => {
    return Functions.throttle(transition, Charts.transitions.dataPath, { leading: false, trailing: true })
  }, [transition])

  useLayoutEffect(() => {
    if (hasDiffs && pathNext && pathPrev) {
      const opacity = hasData ? 1 : 0
      const fn = firstTransition.current ? transition : throttleTransition
      fn(pathNext, pathPrev, opacity)
      firstTransition.current = false
    }
  }, [hasData, hasDiffs, pathNext, pathPrev, throttleTransition, transition])
}
