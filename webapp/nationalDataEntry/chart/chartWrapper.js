import React from 'react'
import UpdateOnResizeReactComponent from '../../reusableUiComponents/updateOnResizeReactComponent'
import Chart from './chart'

class ChartWrapper extends UpdateOnResizeReactComponent {
  render () {
    const defaultWidth = 913 //TODO what's a good default before we have bounding rect?
    const width = this.refs.chartWrapper ? this.refs.chartWrapper.getBoundingClientRect().width : defaultWidth
    return <div ref="chartWrapper" className="nde__data-chart">
      <Chart wrapperWidth={width}
             stateName={this.props.stateName}
             trends={this.props.trends}
             showNoDataText={this.props.showNoDataText}/>
    </div>
  }
}

export default ChartWrapper
