import React, { Component } from 'react'
import { connect } from 'react-redux'

import R from 'ramda'

import NoDataPlaceholder from './noDataPlaceholder'
import DataCircles from './dataCircles'
import XAxis from './xAxis'
import YAxis from './yAxis'

import { getChartData, styles } from './chartData'

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.forestArea, nextProps.forestArea)
    return !isDataEqual
  }

  render () {
    return <div ref="chartContainer">
      { this.props.forestArea ? <svg width={styles.width} height={styles.height}>
        <YAxis {...this.props.forestArea} {...styles} />
        <XAxis {...this.props.forestArea} {...styles} />
        <DataCircles {...this.props.forestArea} {...styles} />
        <NoDataPlaceholder {...this.props.forestArea} {...styles} />
      </svg>
        : null }
    </div>
  }
}

const mapStateToProps = state => {
  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {
    const forestArea = getChartData(nde.fra, 'forestArea')

    return {forestArea}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
