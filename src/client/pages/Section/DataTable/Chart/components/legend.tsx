import React, { Component } from 'react'

import * as d3 from 'd3'

import { Charts } from 'client/pages/Section/DataTable/Chart/charts'

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
        .duration(Charts.transitionDuration)
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
        .duration(Charts.transitionDuration / 2)
        .style('width', hasData ? 'auto' : '0')
        .style('margin-right', hasData ? '16px' : '0')
        .transition()
        .ease(d3.easePolyOut)
        .duration(Charts.transitionDuration)
        .style('opacity', hasData ? '1' : '0')
    })
  }

  render() {
    return (
      <foreignObject
        height="20px"
        width={(this.props as any).wrapperWidth - Charts.styles.left - 8}
        x={Charts.styles.left + 8}
        y="0"
      >
        <div className="chart__legend-wrapper">
          {(this.props as any).trends.map((trend: any) => {
            return (
              <div key={trend.name} ref={trend.name} className="chart__legend-item">
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
