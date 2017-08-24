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
    const languageChanged = this.props.i18n ? this.props.i18n.language !== nextProps.i18n.language : false
    return !isDataEqual || !isWidthTheSame || languageChanged
  }

  render () {
    return <div ref="chartContainer">
      {this.props.data ? <svg width={this.props.wrapperWidth} height={styles.height}>
          <YAxis {...this.props} {...styles} />
          <XAxis {...this.props} {...styles} />
          {this.props.trends.map(t => <DataCircles key={t} {...this.props} data={this.props.data[t]} {...styles} />)}
          <NoDataPlaceholder {...this.props} {...styles} />
        </svg>
        : null}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  const nde = state[props.stateName]
  if (nde && nde.fra) {

    const data = R.pipe(
      R.map(t => ({[t]: getChartData(nde.fra, t)})),
      R.mergeAll
    )(props.trends)

    const xScale = getXScale(props)
    const yScale = getYScale(data)

    return {data, xScale, yScale, i18n: state.user.i18n}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
