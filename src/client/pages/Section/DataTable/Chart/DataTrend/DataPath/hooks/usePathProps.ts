import { RefObject, useCallback, useMemo } from 'react'

import * as d3 from 'd3'
import { Arrays } from 'utils/arrays'

import { useIsMounted, usePrevious } from 'client/hooks'
import { Charts } from 'client/pages/Section/DataTable/Chart/charts'
import { D3ChartAxisScale, Trend, TrendData, TrendDatum } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  data: TrendData
  pathRef: RefObject<SVGPathElement>
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

type GetPath = (data: Array<Pick<TrendDatum, 'year' | 'value'>>) => string

type Returned = {
  hasData: boolean
  hasDiffs: boolean
  pathNext: string
  pathPrev: string
}

export const usePathProps = (props: Props): Returned => {
  const { data, pathRef, trend, xScale, yScale } = props
  const { name: trendName } = trend
  const dataPrev = usePrevious(data, data)
  const mounted = useIsMounted()

  const getPath = useCallback<GetPath>(
    (data) => {
      return d3
        .line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))
        .curve(d3.curveLinear)(data.map((datum) => [datum.year, datum.value]))
    },
    [xScale, yScale]
  )

  const getPathDefault = useCallback<GetPath>(
    (data) => {
      const datum = data.at(0)
      const item = { year: datum.year, value: datum.value }
      return getPath([item, item])
    },
    [getPath]
  )

  const hasData = useMemo<boolean>(() => Charts.hasData({ trendsData: { [trendName]: data } }), [data, trendName])
  const hasDataPrev = useMemo<boolean>(
    () => Charts.hasData({ trendsData: { [trendName]: dataPrev } }),
    [dataPrev, trendName]
  )
  const hasDiffs = useMemo<boolean>(() => {
    if (mounted.current) {
      return Arrays.difference(data, dataPrev).length > 0 || Arrays.difference(dataPrev, data).length > 0
    }
    // when mounting with data already fetched (data and dataPrev are the same)
    return hasData
  }, [data, dataPrev, hasData, mounted])

  const pathNext = useMemo<string | undefined>(() => {
    if (hasData) return getPath(data) // interpolating to next data
    if (!hasData && hasDataPrev) return getPathDefault(dataPrev) // exiting from view
    return undefined
  }, [data, dataPrev, getPath, getPathDefault, hasData, hasDataPrev])

  const pathPrev = useMemo<string>(() => {
    const currentPath = pathRef.current?.getAttribute('d')
    // first interpolation
    if (!currentPath && hasData) return getPathDefault(data)
    return currentPath
  }, [data, getPathDefault, hasData, pathRef])

  return { hasData, hasDiffs, pathNext, pathPrev }
}
