import React, { Component } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

import { styles } from '../chart'

class Legend extends Component {

  componentWillReceiveProps (nextProps) {
    this.update(nextProps)
  }

  componentDidMount () {
    const state =
      R.mapObjIndexed((data, key) => {
        return {offsetWidth:this.refs[key].offsetWidth}
      }

    )(this.props.data)
    console.log('-----',state)
    this.setState(state)
    this.update(this.props, state)
  }

  update (props, state = this.state) {

    R.forEachObjIndexed((data, key) => {
console.log(this)
console.log(state)
console.log(key)

      const {ease, opacity, width} = data.length > 0
        ? {ease: d3.easeBackIn, opacity: 1, width: state[key].offsetWidth+5}
        : {ease: d3.easeBackOut, opacity: 0, width:0}

      d3.select(this.refs[key])
        .transition()
        .ease(ease)
        .duration(400)
        .style('opacity', opacity)
        .style('width', width)

    }, props.data)

  }

  render () {
    return <foreignObject x={styles.left + 2} y="0" width={this.props.wrapperWidth - styles.left - 2} height="20">
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        {this.props.trends.map(t =>
          <div key={`legend-${t.name}`}
               ref={t.name}
               style={{
                 display: 'flex',
                 justifyContent: 'flex-start',
                 alignItems: 'center',
                 marginRight: '20px',
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
              color: '#666666'
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
