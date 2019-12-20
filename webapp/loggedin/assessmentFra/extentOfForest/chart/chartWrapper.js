import React from 'react'
import UpdateOnResizeReactComponent from '@webapp/components/updateOnResizeReactComponent'
import ChartContainer from './chartContainer'
import { isPrintingMode } from '@webapp/loggedin/printAssessment/printAssessment'

class ChartWrapper extends UpdateOnResizeReactComponent {
  componentDidUpdate () {
    if (!this.width || !this.getWidth()) return
    if (this.width !== this.getWidth()) this.forceUpdate()
  }

  getWidth () {
    return this.refs.chartWrapper && !isPrintingMode()
      ? this.refs.chartWrapper.getBoundingClientRect().width
      : 960
  }

  render () {
    this.width = this.getWidth()
    return <div ref="chartWrapper" className="chart__container">
      <ChartContainer
        fra={this.props.fra}
        wrapperWidth={this.width}
        stateName={this.props.stateName}
        trends={this.props.trends}/>
    </div>
  }
}

export default ChartWrapper
