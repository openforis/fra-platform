import React, { Component } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { styles, defaultTransitionDuration } from '../chart'

class Legend extends Component {
  componentDidUpdate(prevProps, prevState) {
    this.update(this.props)
  }

  componentDidMount () {
    this.enter(this.props)
  }

  enter(props) {
    R.forEachObjIndexed((data, key) => {
      const elem = this.refs[key]
      const hasData = data.length > 0 ? true : false
      d3.select(elem)
        .style('width', hasData ? 'auto' : '0')
        .style('margin-right', hasData ? '16px': '0')
        .transition()
          .ease(d3.easePolyOut)
          .delay(100)
          .duration(defaultTransitionDuration)
          .style('opacity', hasData ? '1' : '0')
    }, props.data)
  }

  update(props) {
    R.forEachObjIndexed((data, key) => {
      const elem = this.refs[key]
      const hasData = data.length > 0 ? true : false
      d3.select(elem)
        .transition()
          .ease(d3.easePolyOut)
          .duration(defaultTransitionDuration/2)
          .style('width', hasData ? 'auto' : '0')
          .style('margin-right', hasData ? '16px': '0')
        .transition()
          .ease(d3.easePolyOut)
          .duration(defaultTransitionDuration)
          .style('opacity', hasData ? '1' : '0')
    }, props.data)
  }

  render () {
    return <foreignObject
      x={styles.left + 8}
      y="0"
      width={this.props.wrapperWidth - styles.left - 8}
      height="20px">
      <div className="chart__legend-wrapper">
        {
          this.props.trends.map(trend => {
            return <div className="chart__legend-item" key={trend.name} ref={trend.name}>
              <div className="chart__legend-item-color" style={{backgroundColor: trend.color}}></div>
              <div className="chart__legend-item-label">{trend.label}</div>
            </div>
            }
          )
        }
      </div>
    </foreignObject>
  }
}

export default Legend
