import React from 'react'

const NoDataPlaceHolder = ({data, width, padding}) =>
  data.length <= 0 ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="62" height="87"
           x={(width / 2) + padding - 40} y="16.5"></image>
  </g>
    : null

export default NoDataPlaceHolder
