import React, { Component } from 'react'
import { connect } from 'react-redux'

import R from 'ramda'

import NoDataPlaceholder from './components/noDataPlaceholder'
import DataTrend from './components/dataTrend'
import XAxis from './components/xAxis'
import YAxis from './components/yAxis'
import OdpTicks from './components/odpTicks'

import { getChartData, getXScale, getYScale, styles, getTrendOdps } from './chart'

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.data, nextProps.data)
    const isWidthTheSame = this.props.wrapperWidth === nextProps.wrapperWidth
    const languageChanged = this.props.i18n ? this.props.i18n.language !== nextProps.i18n.language : false
    return !isDataEqual || !isWidthTheSame || languageChanged
  }

  render () {
    return <div ref="chartContainer">
      {this.props.data
        ? <svg width={this.props.wrapperWidth} height={styles.height}>
          <YAxis {...this.props} {...styles} />
          <XAxis {...this.props} {...styles} />
          {/*odp ticks must be visible behind all data points*/}
          {this.props.trends.map(t =>
            <OdpTicks
              key={`odp-ticks-${t}`}
              {...this.props}
              data={getTrendOdps(this.props.data[t])}/>
          )}
          {this.props.trends.map(t =>
            <DataTrend
              key={`data-trend-${t}`}
              {...this.props}
              {...styles}
              data={this.props.data[t]}
            />
          )}
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

    const xScale = getXScale(props.wrapperWidth)
    const yScale = getYScale(data)

    return {data, xScale, yScale, i18n: state.user.i18n}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
