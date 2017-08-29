import React from 'react'
import { hasData } from './chartData'

const Text = ({text, width, y}) =>
  <foreignObject width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#999999'}} x="0" y="0">{text}</text>
  </foreignObject>

const NoDataPlaceholder = ({data, wrapperWidth, i18n, showPlaceholder}) =>
  !hasData(data)
    ? <g className="noDataPlaceholder">
      <image href="/img/tucan.svg"
             width="62" height="87"
             x={((wrapperWidth - 62) / 2)} y="14"></image>
      {showPlaceholder ?
        <Text text={i18n.t('extentOfForest.chart.placeholderLine1')} width={wrapperWidth} y="136"/> : null}
      {showPlaceholder ?
        <Text text={i18n.t('extentOfForest.chart.placeholderLine2')} width={wrapperWidth} y="156"/> : null}
    </g>
    : null

export default NoDataPlaceholder
