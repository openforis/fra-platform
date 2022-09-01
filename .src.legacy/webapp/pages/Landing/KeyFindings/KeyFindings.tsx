import './keyFindings.scss'
import React from 'react'

import { useI18n } from '@webapp/hooks'

const climaticDomains = {
  tropical: 45,
  boreal: 27,
  temperate: 16,
  subtropical: 11,
}

const KeyFindings: React.FC = () => {
  const i18n = useI18n()

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img alt="" src="/img/map.png" className="map" />
      </div>

      <div>{i18n.t('home.keyFindings')}</div>

      <div className="home-key-findings__map-legend">
        {Object.entries(climaticDomains).map(([key, value]) => (
          <div key={key} className="legend">
            <img className="legend-icon" alt="" src={`/img/mapLegend_${key}.svg`} />
            <div className="legend-key">{i18n.t(`climaticDomain.${key}`)}</div>
            <div className="legend-value">{value}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default KeyFindings
