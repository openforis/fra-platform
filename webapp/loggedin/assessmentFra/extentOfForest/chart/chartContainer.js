import './style.less'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as R from 'ramda'

import NoDataPlaceholder from './components/noDataPlaceholder'
import DataTrend from './components/dataTrend'
import XAxis from './components/xAxis'
import YAxis from './components/yAxis'
import OdpTicks from './components/odpTicks'
import Legend from './components/legend'

import { getChartData, getXScale, getYScale, styles, getTrendOdps } from './chart'

class Chart extends Component {

  shouldComponentUpdate (nextProps) {
    const isDataEqual = R.equals(this.props.data, nextProps.data)
    const isWidthTheSame = this.props.wrapperWidth === nextProps.wrapperWidth
    const languageChanged = this.props.i18n ? this.props.i18n.language !== nextProps.i18n.language : false
    return !isDataEqual || !isWidthTheSame || languageChanged
  }

  render () {
    return <div ref="chartContainer" style={{textAlign: 'center'}}>
      {this.props.data
        ? <svg width={this.props.wrapperWidth} height={styles.height}>
          <Legend {...this.props} />
          <YAxis {...this.props} {...styles} />
          <XAxis {...this.props} {...styles} />
          {/*odp ticks must be positioned behind all data points*/}
          {this.props.trends.map(t =>
            <OdpTicks
              key={`odp-ticks-${t.name}`}
              className={`chart__odp-ticks-${t.name}`}
              {...this.props}
              {...t}
              data={getTrendOdps(this.props.data[t.name])}/>
          )}
          {this.props.trends.map(t =>
            <DataTrend
              key={`data-trend-${t.name}`}
              className={`chart__data-trend-${t.name}`}
              {...this.props}
              {...styles}
              {...t}
              data={this.props.data[t.name]}
            />
          )}
          <NoDataPlaceholder {...this.props} {...styles} />
        </svg>
        : null}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  if (props.fra) {
    const data = R.pipe(
      R.map(t => ({[t.name]: getChartData(props.fra, t.name)})),
      R.mergeAll
    )(props.trends)

    const xScale = getXScale(props.wrapperWidth, data)
    const yScale = getYScale(data)

    return {data, xScale, yScale, i18n: state.user.i18n}
  }
  return {}
}

export default connect(mapStateToProps)(Chart)
