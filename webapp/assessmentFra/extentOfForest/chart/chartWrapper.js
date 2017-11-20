import React from 'react'
import UpdateOnResizeReactComponent from '../../../reusableUiComponents/updateOnResizeReactComponent'
import ChartContainer from './chartContainer'

class ChartWrapper extends UpdateOnResizeReactComponent {
  componentDidUpdate() {
    if (!this.width || !this.getWidth()) return
    if (this.width !== this.getWidth()) this.forceUpdate()
  }

  getWidth() {
    return this.refs.chartWrapper ? this.refs.chartWrapper.getBoundingClientRect().width : 960
  }

  render() {
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
