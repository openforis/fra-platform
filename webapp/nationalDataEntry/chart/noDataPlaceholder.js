import React from 'react'

const Text = ({text, width, y}) =>
  <foreignObject width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#666666'}} x="0" y="0">{text}</text>
  </foreignObject>

const NoDataPlaceholder = ({data, width, padding}) =>
  data.forestArea.length <= 0 && data.otherWoodedLand.length <= 0
    ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="62" height="87"
           x={(width / 2) + padding - 40} y="19.5"></image>
    <Text text="To get started, add new national data points and use" width={width} y="140"/>
    <Text text="them to generate FRA values automatically." width={width} y="160"/>
  </g>
    : null

export default NoDataPlaceholder
