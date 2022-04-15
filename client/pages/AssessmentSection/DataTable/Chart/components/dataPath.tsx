import React, { useEffect, useRef } from 'react'

import { usePrevious } from '@client/hooks'
import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'
import * as R from 'ramda'

import * as Chart from '../chart'

type Props = {
  data: any[]
  style: any
  xScale: (...args: any[]) => any
  yScale: (...args: any[]) => any
}

const DataPath = (props: Props) => {
  const { data, xScale, yScale, style } = props
  const dataPrev = usePrevious(data, data)
  const pathElementRef = useRef(null)

  const getPath = (dataPath: any) =>
    d3
      .line()
      .x((d: any) => xScale(d.year))
      .y((d: any) => yScale(d.value))
      .curve(d3.curveLinear)(dataPath)

  const getPathDefault = (dataPath: any) =>
    getPath([
      // @ts-ignore
      { year: R.head(dataPath).year, value: 0 },
      // @ts-ignore
      { year: R.last(dataPath).year, value: 0 },
    ])

  useEffect(() => {
    const pathElement = pathElementRef.current.getAttribute('d')
    const hasData = data.length > 1
    const hasPrevData = dataPrev.length > 1

    let pathNext: any = null
    if (hasData) pathNext = getPath(data) // interpolating to next data
    if (!hasData && hasPrevData) pathNext = getPathDefault(dataPrev) // exiting from view

    let pathPrev = pathElement
    if (!pathPrev && hasData) pathPrev = getPathDefault(data) // first interpolation

    const opacity = hasData ? 1 : 0

    if (pathNext && pathPrev) {
      d3.select(pathElementRef.current)
        .transition()
        .ease(d3.easePolyOut)
        .duration(Chart.defaultTransitionDuration)
        .attrTween('d', () => interpolatePath(pathPrev, pathNext))
        .style('opacity', opacity)
    }
  }, [data])

  return <path ref={pathElementRef} style={{ ...style, opacity: 0 }} className="chart__data-path" d={null} />
}

export default DataPath
