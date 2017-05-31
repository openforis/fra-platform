import React from 'react'

const NoDataPlaceholder = ({data, width, padding}) =>
  data.length <= 0 ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="62" height="87"
           x={(width / 2) + padding - 40} y="15.5"/>
    <text x="100" y="154" width="360" fontSize="14" fill="#999">To get started, add new national data points and use them to generate FRA values automatically.</text>
  </g>
    : null

export default NoDataPlaceholder
