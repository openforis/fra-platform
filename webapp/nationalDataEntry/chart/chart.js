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
    const isWidthTheSame = this.props.wrapperWidth === nextProps.wrapperWidth
    return !isDataEqual || !isWidthTheSame
  }

  render () {
    return <div ref="chartContainer">
      { this.props.data ? <svg width={this.props.wrapperWidth} height={styles.height}>
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

  const nde = state['nationalDataEntry']
  if (nde && nde.fra) {

    const data = {
      forestArea: getChartData(nde.fra, 'forestArea'),
      otherWoodedLand: getChartData(nde.fra, 'otherWoodedLand')
    }

    const xScale = getXScale(props)
    const yScale = getYScale(data)

    return {data, xScale, yScale, i18n: state.user.i18n}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
