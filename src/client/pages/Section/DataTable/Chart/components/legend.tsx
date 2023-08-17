import React, { Component } from 'react'

import * as d3 from 'd3'

import { defaultTransitionDuration, styles } from '../chart'

type Props = any

class Legend extends Component {
  props: Props

  componentDidUpdate(prevProps: any, prevState: any) {
    this.update(this.props)
  }

  componentDidMount() {
    this.enter(this.props)
  }

  enter(props: any) {
    Object.entries(props.data).forEach(([key, data]) => {
      const elem: any = this.refs[key]
      const hasData = data.length > 0
      d3.select(elem)
        .style('width', hasData ? 'auto' : '0')
        .style('margin-right', hasData ? '16px' : '0')
        .transition()
        .ease(d3.easePolyOut)
        .delay(100)
        .duration(defaultTransitionDuration)
        .style('opacity', hasData ? '1' : '0')
    })
  }

  update(props: any) {
    Object.entries(props.data).forEach(([key, data]) => {
      const elem: any = this.refs[key]
      const hasData = data.length > 0
      d3.select(elem)
        .transition()
        .ease(d3.easePolyOut)
        .duration(defaultTransitionDuration / 2)
        .style('width', hasData ? 'auto' : '0')
        .style('margin-right', hasData ? '16px' : '0')
        .transition()
        .ease(d3.easePolyOut)
        .duration(defaultTransitionDuration)
        .style('opacity', hasData ? '1' : '0')
    })
  }

  render() {
    return (
      <foreignObject x={styles.left + 8} y="0" width={(this.props as any).wrapperWidth - styles.left - 8} height="20px">
        <div className="chart__legend-wrapper">
          {(this.props as any).trends.map((trend: any) => {
            return (
              <div className="chart__legend-item" key={trend.name} ref={trend.name}>
                <div className="chart__legend-item-color" style={{ backgroundColor: trend.color }} />
                <div className="chart__legend-item-label">{trend.label}</div>
              </div>
            )
          })}
        </div>
      </foreignObject>
    )
  }
}
export default Legend
