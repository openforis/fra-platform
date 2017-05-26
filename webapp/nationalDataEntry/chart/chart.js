import React, { Component } from 'react'
import { connect } from 'react-redux'

import R from 'ramda'

import NoDataPlaceholder from './noDataPlaceholder'
import DataCircles from './dataCircles'
import XAxis from './xAxis'
import YAxis from './yAxis'

import { getXScale, getYScale, styles, addPlaceholders } from './chartData'

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.data, nextProps.data)
    return !isDataEqual
  }

  render () {
    return <div ref="chartContainer">
      { this.props.data ? <svg width={styles.width} height={styles.height}>
        <NoDataPlaceholder {...this.props} {...styles} />
        <DataCircles {...this.props} {...styles} />
        <XAxis {...this.props} {...styles} />
        <YAxis {...this.props} {...styles} />
      </svg>
        : null }
    </div>
  }
}

const mapStateToProps = state => {
  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {
    const data = R.pipe(
      R.values,
      R.filter(v => typeof v.forestArea === 'number'),
      R.map((v) => { return {year: v.year, forestArea: v.forestArea, type: v.type, estimated: v.estimated} }),
      addPlaceholders
    )(nde.fra)

    const xScale = getXScale(data)
    const yScale = getYScale(data)

    return {data, xScale, yScale}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
