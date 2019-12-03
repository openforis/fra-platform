import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux'
import * as R from 'ramda'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { formatNumber } from '../../../../../common/bignumberUtils'
import { defaultTransitionDuration } from '../chart'

class DataPoint extends Component {

  update (props) {
    const {xScale, yScale, data, color} = props

    if (data) {
      const circle = d3.select(ReactDOM.findDOMNode(this.refs.circles))
        .selectAll('circle')
        .data(data)

      //update
      circle
        .transition()
          .duration(defaultTransitionDuration)
          .ease(d3.easePolyOut)
          .attr('cx', d => xScale(d.year))
          .attr('cy', d => yScale(d.value))
          .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
          .style('fill', d => d.type === 'fra' ? '#ffffff' : color)
          .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
          .style('stroke-width', '1.5')
          .style('opacity', '1')

      //exit
      circle.exit()
        .transition()
          .duration(defaultTransitionDuration)
          .ease(d3.easePolyOut)
          .attr('cy', d => yScale(0))
          .style('opacity', '0')
          .remove()

      //enter
      circle.enter().append('circle')
        .on('mouseover', this.toolTip.show)
        .on('mouseout', this.toolTip.hide)
        .attr('r', 0)
        .attr('cx', d => xScale(1990))
        .attr('cy', d => yScale(0))
        .style('fill', '#ffffff')
        .attr('cx', d => xScale(d.year))
        .transition()
          .duration(defaultTransitionDuration)
          .ease(d3.easePolyOut)
          .attr('cx', d => xScale(d.year))
          .attr('cy', d => yScale(d.value))
          .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
          .style('fill', d => d.type === 'fra' ? '#ffffff' : color)
          .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
          .style('stroke-width', '1.5')
          .style('opacity', '1')

    }
  }

  htmlTooltip (d) {
    const precision = Number.isInteger(d.value) ? 0 : 2
    return <div>
        <div className="chart__tooltip-heading">{d.year}</div>
        <div className="chart__tooltip-value-container">
            <div className="chart__tooltip-marker" style={{backgroundColor: d.type === 'fra' ? '#ffffff' : this.props.color}}></div>
            <div className="chart__tooltip-value">{formatNumber(d.value, precision)}</div>
            <div className="chart__tooltip-unit">(1000 ha)</div>
        </div>
        {
          d.dataSourceMethods
          ? <div className="chart__tooltip-methods">
              <div className="chart__tooltip-heading">
                {this.props.i18n.t('nationalDataPoint.methodsUsed')}
              </div>
              {
                R.map(dataSourceMethod =>
                  <div key={dataSourceMethod} className="chart__tooltip-data-source">
                    {this.props.i18n.t('nationalDataPoint.dataSourceMethodsOptions.' + dataSourceMethod)}
                  </div>
                , d.dataSourceMethods)
              }
           </div>
          : null
        }
    </div>
  }

  componentDidMount () {
    this.toolTip = d3Tip()
      .attr('class', 'chart__tooltip')
      .offset([-10, 0])
      .html((d) => ReactDOMServer.renderToString(this.htmlTooltip(d)))

    d3.select(this.refs.circles)
      .call(this.toolTip)

    this.update(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    this.update(this.props)
  }

  render () {
    return <g ref="circles" className="chart__data-points"></g>
  }

}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(DataPoint)
