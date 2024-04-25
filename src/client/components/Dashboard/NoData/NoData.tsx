import './NoData.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

const toucanY = 20
const toucanWidth = 62
const toucanHeight = 87
const textY = toucanY + toucanHeight

const NoData = () => {
  const { t } = useTranslation()
  const wrapperWidth = 80
  const centerX = wrapperWidth / 2

  return (
    <div className="dashboard__no-data">
      <svg height="100%" width={wrapperWidth}>
        <g className="chart__no-data-placeholder">
          <image
            height={toucanHeight}
            href="/img/tucan.svg"
            width={toucanWidth}
            x={(wrapperWidth - toucanWidth) / 2}
            y={toucanY}
          />
          <g>
            <text dominantBaseline="middle" textAnchor="middle" x={centerX} y={textY + 20}>
              {t('statisticalFactsheets.noData')}
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default NoData
