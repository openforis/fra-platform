import React, { Component } from 'react'
import { connect } from 'react-redux'

import R from 'ramda'

import NoDataPlaceholder from './noDataPlaceholder'
import DataCircles from './dataCircles'
import XAxis from './xAxis'
import YAxis from './yAxis'

import { getChartData, getXScale, getYScale, styles } from './chartData'

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.data, nextProps.data)
    return !isDataEqual
  }

  render () {
    console.log("Wrapper width", this.props.wrapperWidth)
    return <div ref="chartContainer">
      { this.props.data ? <svg width={styles.width} height={styles.height}>
        <YAxis {...this.props} {...styles} />
        <XAxis {...this.props} {...styles} />
        <DataCircles {...this.props} data={this.props.data.forestArea} {...styles} />
        <DataCircles {...this.props} data={this.props.data.otherWoodedLand} {...styles} />
        <NoDataPlaceholder {...this.props} {...styles} />
      </svg>
        : null }
    </div>
  }
}

const mapStateToProps = (state, props) => {
  console.log("Wrapper width to be passed to getChartData", props.wrapperWidth)

  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {

    const data = {
      forestArea: getChartData(nde.fra, 'forestArea'),
      otherWoodedLand: getChartData(nde.fra, 'otherWoodedLand')
    }

    const xScale = getXScale()
    const yScale = getYScale(data)

    return {data, xScale, yScale}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
