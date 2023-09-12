import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'

import { defaultTransitionDuration } from '../chart'

type Props = any

class DataPoint extends Component<Props, {}> {
  props: Props

  refs: any

  toolTip: any

  update(props: Props) {
    const { xScale, yScale, data, color }: any = props
    if (data) {
      const _circles = this.refs.circles
      // @ts-ignore
      // TODO : fix this
      const circle = d3.select(ReactDOM.findDOMNode(_circles)).selectAll('circle').data(data)
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
    const data = d?.target?.__data__
    if (!data) return
    const precision = Number.isInteger(data.value) ? 0 : 2
    return (
      <div>
        <div className="chart__tooltip-heading">{data.year}</div>
        <div className="chart__tooltip-value-container">
          <div
            className="chart__tooltip-marker"
            style={{ backgroundColor: data.type === 'fra' ? '#ffffff' : (this.props as any).color }}
          />
          <div className="chart__tooltip-value">{Numbers.format(data.value, precision)}</div>
          <div className="chart__tooltip-unit">(1000 ha)</div>
        </div>
        {data.dataSourceMethods && (
          <div className="chart__tooltip-methods">
            <div className="chart__tooltip-heading">{(this.props as any).i18n.t('nationalDataPoint.methodsUsed')}</div>
            {data.dataSourceMethods.map((dataSourceMethod: any) => (
              <div key={dataSourceMethod} className="chart__tooltip-data-source">
                {(this.props as any).i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${dataSourceMethod}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  componentDidMount() {
    // @ts-ignore
    this.toolTip = d3Tip()
      .attr('class', 'chart__tooltip')
      .offset([-10, 0])
      .html((d: any) => ReactDOMServer.renderToString(this.htmlTooltip(d)))
    // @ts-ignore
    d3.select(this.refs.circles).call(this.toolTip)
    this.update(this.props)
  }

  componentDidUpdate(prevProps: Props, prevState: any) {
    this.update(this.props)
  }

  render() {
    return <g ref="circles" className="chart__data-points" />
  }
}

// Workaround to pass i18n from hook
const _DataPoint = (props: any) => {
  const { i18n } = useTranslation()
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DataPoint i18n={i18n} {...props} />
}

export default _DataPoint
