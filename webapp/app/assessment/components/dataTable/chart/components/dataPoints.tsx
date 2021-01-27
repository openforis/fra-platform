import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3'.... Remove this comment to see the full error message
import * as d3 from 'd3'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-t... Remove this comment to see the full error message
import d3Tip from 'd3-tip'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { formatNumber } from '@common/bignumberUtils'
import * as AppState from '@webapp/store/app/state'
import { defaultTransitionDuration } from '../chart'

class DataPoint extends Component {
  toolTip: any

  update(props: any) {
    const { xScale, yScale, data, color } = props
    if (data) {
      const circle = d3.select(ReactDOM.findDOMNode(this.refs.circles)).selectAll('circle').data(data)
      // update
      circle
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('cx', (d: any) => xScale(d.year))
        .attr('cy', (d: any) => yScale(d.value))
        .attr('r', (d: any) => (d.type === 'odp' ? 4.5 : 6.5))
        .style('fill', (d: any) => (d.type === 'fra' ? '#ffffff' : color))
        .style('stroke', (d: any) => (d.type === 'fra' ? '#333333' : '#ffffff'))
        .style('stroke-width', '1.5')
        .style('opacity', '1')
      // exit
      circle
        .exit()
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('cy', (d: any) => yScale(0))
        .style('opacity', '0')
        .remove()
      // enter
      circle
        .enter()
        .append('circle')
        .on('mouseover', this.toolTip.show)
        .on('mouseout', this.toolTip.hide)
        .attr('r', 0)
        .attr('cx', (d: any) => xScale(1990))
        .attr('cy', (d: any) => yScale(0))
        .style('fill', '#ffffff')
        .attr('cx', (d: any) => xScale(d.year))
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easePolyOut)
        .attr('cx', (d: any) => xScale(d.year))
        .attr('cy', (d: any) => yScale(d.value))
        .attr('r', (d: any) => (d.type === 'odp' ? 4.5 : 6.5))
        .style('fill', (d: any) => (d.type === 'fra' ? '#ffffff' : color))
        .style('stroke', (d: any) => (d.type === 'fra' ? '#333333' : '#ffffff'))
        .style('stroke-width', '1.5')
        .style('opacity', '1')
    }
  }

  htmlTooltip(d: any) {
    const precision = Number.isInteger(d.value) ? 0 : 2
    return (
      <div>
        <div className="chart__tooltip-heading">{d.year}</div>
        <div className="chart__tooltip-value-container">
          <div
            className="chart__tooltip-marker"
            style={{ backgroundColor: d.type === 'fra' ? '#ffffff' : (this.props as any).color }}
          />
          <div className="chart__tooltip-value">{formatNumber(d.value, precision)}</div>
          <div className="chart__tooltip-unit">(1000 ha)</div>
        </div>
        {d.dataSourceMethods ? (
          <div className="chart__tooltip-methods">
            <div className="chart__tooltip-heading">{(this.props as any).i18n.t('nationalDataPoint.methodsUsed')}</div>
            {R.map(
              (dataSourceMethod: any) => (
                <div key={dataSourceMethod} className="chart__tooltip-data-source">
                  {(this.props as any).i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${dataSourceMethod}`)}
                </div>
              ),
              d.dataSourceMethods
            )}
          </div>
        ) : null}
      </div>
    )
  }

  componentDidMount() {
    this.toolTip = d3Tip()
      .attr('class', 'chart__tooltip')
      .offset([-10, 0])
      .html((d: any) => ReactDOMServer.renderToString(this.htmlTooltip(d)))
    d3.select(this.refs.circles).call(this.toolTip)
    this.update(this.props)
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    this.update(this.props)
  }

  render() {
    return <g ref="circles" className="chart__data-points" />
  }
}
const mapStateToProps = (state: any) => ({
  i18n: AppState.getI18n(state),
})
export default connect(mapStateToProps)(DataPoint)
