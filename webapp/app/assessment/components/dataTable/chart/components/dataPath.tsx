import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'

import { usePrevious } from '@webapp/components/hooks'

import * as Chart from '../chart'

const DataPath = (props) => {
  const { data, xScale, yScale, style } = props
  const dataPrev = usePrevious(data, data)
  const pathElementRef = useRef(null)

  const getPath = (dataPath) =>
    d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value))
      .curve(d3.curveLinear)(dataPath)

  const getPathDefault = (dataPath) =>
    getPath([
      { year: R.head(dataPath).year, value: 0 },
      { year: R.last(dataPath).year, value: 0 },
    ])

  useEffect(() => {
    const pathElement = pathElementRef.current.getAttribute('d')
    const hasData = data.length > 1
    const hasPrevData = dataPrev.length > 1

    let pathNext = null
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

DataPath.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
}

export default DataPath
