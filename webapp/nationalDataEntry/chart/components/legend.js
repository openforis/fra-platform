import React, { Component } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { styles, defaultTransitionDuration } from '../chart'

class Legend extends Component {

  componentWillReceiveProps (nextProps) {
    this.update(nextProps)
  }

  componentDidMount () {
    const state = R.mapObjIndexed((data, key) => ({offsetWidth: this.refs[key].offsetWidth}), this.props.data)
    this.setState(state)

    this.update(this.props, state)
  }

  update (props, state = this.state) {

    R.forEachObjIndexed((data, key) => {

      const elem = this.refs[key]
      const elemWidth = elem.offsetWidth
      const elemOpacity = elem.style.opacity

      const {ease, opacity, width} = data.length >= 1
        ? {ease: d3.easeBackIn, opacity: 1, width: state[key].offsetWidth + 15}
        : {ease: d3.easeBackOut, opacity: 0, width: 0}

      d3.select(elem)
        .style('height', '20')
        .transition()
        .ease(ease)
        .duration(defaultTransitionDuration)
        .styleTween('height', d => d3.interpolate(20, 20))
        .styleTween('width', d => d3.interpolate(elemWidth, width))
        .styleTween('opacity', d => d3.interpolate(elemOpacity, opacity))

    }, props.data)

  }

  render () {
    return <foreignObject x={styles.left + 2} y="0" width={this.props.wrapperWidth - styles.left - 2} height="20px">
      <div style={{display: 'flex', justifyContent: 'flex-start', height: '20px'}}>
        {this.props.trends.map(t =>
          <div key={`legend-${t.name}`}
               ref={t.name}
               style={{
                 display: 'flex',
                 justifyContent: 'flex-start',
                 alignItems: 'center',
                 opacity: '0'
               }}>
            {/*legend color*/}
            <div style={{
              width: '10px',
              height: '10px',
              marginRight: '5px',
              borderRadius: '20%',
              backgroundColor: t.odpColor
            }}></div>
            {/*label*/}
            <div style={{
              fontSize: '12px',
              color: '#666666',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}>
              {t.label}
            </div>

          </div>
        )}
      </div>
    </foreignObject>
  }

}

export default Legend
