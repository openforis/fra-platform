import { RefObject, useLayoutEffect } from 'react'

import * as d3 from 'd3'
import { Objects } from 'utils/objects'

import { D3ChartAxisScale, TrendsYears } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  axisRef: RefObject<SVGGElement>
  xScale: D3ChartAxisScale
  years: TrendsYears
}

export const useRenderD3XAxis = (props: Props): void => {
  const { axisRef, xScale, years } = props
  const { max, min } = years ?? {}

  useLayoutEffect(() => {
    if (!Objects.isNil(max) && !Objects.isNil(min)) {
      const tickValues = [...Array(max - min).keys()].reduce<Array<number>>((acc, value) => {
        const year = value + min
        if (year % 5 === 0) acc.push(year)
        return acc
      }, [])

      const xAxis = d3
        .axisBottom(xScale)
        .tickValues(tickValues)
        .tickFormat(d3.format('0000'))
        .tickSize(0)
        .tickPadding(16)

      const node = d3.select(axisRef.current)
      node.call(xAxis).selectAll('text').style('fill', '#666666').style('font-size', '11px')
      node.select('path').remove()
    }
  }, [axisRef, max, min, xScale])
}
