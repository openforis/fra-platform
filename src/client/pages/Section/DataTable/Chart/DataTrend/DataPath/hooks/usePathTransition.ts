import { RefObject, useCallback, useLayoutEffect, useMemo, useRef } from 'react'

import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'
import { Functions } from 'utils/functions'

import { useOnUpdate } from 'client/hooks/onUpdate'
import { useIsPrintRoute } from 'client/hooks/routes'
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
  const { data, pathRef, trend, xScale, yScale } = props

  const { print } = useIsPrintRoute()
  const { hasData, hasDiffs, pathNext, pathPrev } = usePathProps({ data, trend, pathRef, xScale, yScale })
  const firstTransition = useRef<boolean>(true)

  const transition = useCallback(
    (next: string, prev: string, opacity: number) => {
      let duration = print ? 0 : Charts.transitions.dataPath * 2
      if (!firstTransition.current) duration /= 2

      d3.select(pathRef.current)
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attrTween('d', () => interpolatePath(prev, next))
        .style('opacity', opacity)
    },
    [pathRef, print]
  )
  const throttleTransition = useMemo(() => {
    return Functions.throttle(transition, Charts.transitions.dataPath, { leading: false, trailing: true })
  }, [transition])

  useLayoutEffect(() => {
    if (hasDiffs && pathNext && pathPrev) {
      const opacity = hasData ? 1 : 0
      throttleTransition(pathNext, pathPrev, opacity)
      firstTransition.current = false
    }
  }, [hasData, hasDiffs, pathNext, pathPrev, throttleTransition, transition])

  // when xScale updates (width has changed)
  useOnUpdate(() => {
    if (pathNext && pathPrev) {
      const opacity = hasData ? 1 : 0
      throttleTransition(pathNext, pathPrev, opacity)
    }
  }, [hasData, xScale])
}
