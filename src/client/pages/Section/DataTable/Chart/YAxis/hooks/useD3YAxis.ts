import { RefObject, useMemo } from 'react'

import * as d3 from 'd3'

import { ChartProps, D3ChartAxisScale, D3YAxis } from 'client/pages/Section/DataTable/Chart/types'

type Props = Pick<ChartProps, 'width'> & {
  axisRef: RefObject<SVGGElement>
  yScale: D3ChartAxisScale
}

const replaceCommasWithSpaces = (v: number) => d3.format(',')(v).replace(/,/g, ' ')

export const useD3YAxis = (props: Props): D3YAxis => {
  const { axisRef, yScale, width } = props

  return useMemo<D3YAxis>(() => {
    const axis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSizeInner(-width)
      .tickSizeOuter(0)
      .tickFormat(replaceCommasWithSpaces)
      .tickPadding(8)

    const d3Axis = d3.select(axisRef.current).call(axis)
    d3Axis.selectAll('path').style('stroke', '#cccccc')
    d3Axis.selectAll('line').style('stroke', (_: number, i: number) => (i === 0 ? '#cccccc' : 'rgba(0,0,0,.08)'))
    d3Axis.selectAll('text').style('fill', '#666666').style('font-size', '11px')

    return d3Axis
  }, [axisRef, width, yScale])
}
