import React from 'react'

const NoDataPlaceholder = ({data, width, padding}) =>
  data.forestArea.length <= 0 && data.otherWoodedLand.length <= 0
    ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="62" height="87"
           x={(width / 2) + padding - 40} y="16.5"></image>
  </g>
    : null

export default NoDataPlaceholder
