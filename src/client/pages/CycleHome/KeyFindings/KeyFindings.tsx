import './keyFindings.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

const climaticDomains = {
  tropical: 45,
  boreal: 27,
  temperate: 16,
  subtropical: 11,
}

const KeyFindings: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img alt="" src="/img/map.png" className="map" />
      </div>

      <div>{t('home.keyFindings')}</div>

      <div className="home-key-findings__map-legend">
        {Object.entries(climaticDomains).map(([key, value]) => (
          <div key={key} className="legend">
            <img className="legend-icon" alt="" src={`/img/mapLegend_${key}.svg`} />
            <div className="legend-key">{t(`climaticDomain.${key}`)}</div>
            <div className="legend-value">{value}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default KeyFindings
