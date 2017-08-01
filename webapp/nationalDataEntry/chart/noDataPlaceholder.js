import React from 'react'

const Text = ({text, width, y}) =>
  <foreignObject width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#999999'}} x="0" y="0">{text}</text>
  </foreignObject>

const NoDataPlaceholder = ({data, wrapperWidth, i18n}) =>
  data.forestArea.length <= 0 && data.otherWoodedLand.length <= 0
    ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="62" height="87"
           x={((wrapperWidth - 62) / 2)} y="14"></image>
    <Text text={i18n.t('extentOfForest.chart.noDataPlaceholderLine1')} width={wrapperWidth} y="136"/>
    <Text text={i18n.t('extentOfForest.chart.noDataPlaceholderLine2')} width={wrapperWidth} y="156"/>
  </g>
    : null

export default NoDataPlaceholder
