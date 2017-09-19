import React from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'
import {hasData} from '../chart'

const Text = ({text, width, y}) =>
  <foreignObject data-y={y} width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#999999', opacity: 0}} x="0" y="0">{text}</text>
  </foreignObject>

class NoDataPlaceholder extends React.Component {

  getTucanX() {
    const {wrapperWidth} = this.props
    return (wrapperWidth - 62) / 2
  }

  getTucanY() {
    return 14
  }

  getTucanWidth() {
    return 62
  }

  getTucanHeight() {
    return 87
  }

  tucan() {
    return d3.select(this.refs.tucan)
  }

  textWrappers() {
    return d3.select(this.refs.container).selectAll('foreignObject')
  }

  texts() {
    return this.textWrappers().selectAll('text')
  }

  tucanShake(from, to, duration = 100, delay = 0) {
    const x = R.add(this.getTucanX(), R.divide(this.getTucanHeight(), 2))
    const y = R.add(this.getTucanY(), R.divide(this.getTucanHeight(), 2))
    return this.tucan()
      .transition()
      .duration(duration)
      .delay(delay)
      .tween("attr:transform", (d, i, nodes) => {
        const interpolateString = d3.interpolateString(`rotate(${from},${x},${y})`, `rotate(${to},${x},${y})`)
        return (t) => this.tucan().attr("transform", interpolateString(t))
      })
  }

  tucanEnter() {
    this.tucan()
      .attr('y', '-100')
      .style('opacity', '0')
      .transition()
      .duration(250)
      .ease(d3.easeBackOut)
      .attr('y', '14')
      .style('opacity', '1')

    let delay = 250
    this.tucanShake(0, 3, 100, delay)
    this.tucanShake(3, -1, 150, delay += 100)
    this.tucanShake(-1, 0, 100, delay += 150)
  }

  tucanExit() {
    this.tucanShake(0, 5, 100)
    this.tucanShake(1, -3, 50, 100)

    this.tucan()
      .style('opacity', '1')
      .transition()
      .duration(500)
      .delay(300)
      .ease(d3.easeExpOut)
      .attr('y', '-100')
      .style('opacity', '0')
  }

  enter() {
    this.tucanEnter()

    this.texts()
      .style('opacity', '0')
      .transition()
      .duration(300)
      .delay(300)
      .ease(d3.easeCircleOut)
      .style('opacity', '1')

    this.textWrappers()
      .attr('y', (d, i, nodes) => nodes[i].getAttribute('data-y') - 100)
      .transition()
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('y', (d, i, nodes) => nodes[i].getAttribute('data-y'))
  }

  exitDidMount() {
    this.tucanExit()

    this.texts()
      .transition()
      .duration(0)
      .style('opacity', '0')
  }

  exit() {
    this.tucanExit()

    this.texts()
      .transition()
      .duration(0)
      .attr('y', (d, i, nodes) => nodes[i].getAttribute('data-y') - 100)
      .style('opacity', '0')
  }

  componentDidMount() {
    const {data} = this.props

    hasData(data) ? this.exitDidMount() : this.enter()
  }

  componentWillReceiveProps(nextProps) {
    const {data} = this.props
    const propsHasData = hasData(data)
    const nextPropsHasData = nextProps ? hasData(nextProps.data) : false

    if (propsHasData && !nextPropsHasData) {
      this.enter()
    } else if (!propsHasData && nextPropsHasData) {
      this.exit()
    }
  }

  componentWillUnmount() {
    this.tucanExit()
  }

  render() {
    const {wrapperWidth, i18n} = this.props

    return <g className="noDataPlaceholder" ref="container">
      <image ref="tucan" href="/img/tucan.svg"
             width={this.getTucanWidth()} height={this.getTucanHeight()}
             x={this.getTucanX()} y={-100}
             style={{
               opacity: 0
             }}
      />
      <Text text={i18n.t('extentOfForest.chart.placeholderLine1')} width={wrapperWidth} y="136"/>
      <Text text={i18n.t('extentOfForest.chart.placeholderLine2')} width={wrapperWidth} y="156"/>
    </g>
  }

}

export default NoDataPlaceholder
