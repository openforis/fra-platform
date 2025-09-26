import './keyFindings.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { CycleName } from 'meta/assessment/cycle'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'

const climaticDomains: Record<CycleName, Record<string, number>> = {
  '2020': { boreal: 27, subtropical: 11, temperate: 16, tropical: 45 },
  '2025': { boreal: 28, subtropical: 11, temperate: 17, tropical: 45 },
  latest: { boreal: 28, subtropical: 11, temperate: 17, tropical: 45 },
}

const KeyFindings: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const searchParams = new URLSearchParams({ assessmentName, cycleName, countryIso: Global.WO })

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img
          key={cycleName}
          alt={t(`home.mapAltText.${cycleName}`)}
          className="map"
          src={ApiEndPoint.Static.file(`fra/${cycleName}/landing/map.png?${searchParams.toString()}`)}
        />
      </div>

      <div>{t(`home.keyFindings.${cycleName}`)}</div>

      <div className="home-key-findings__map-legend">
        {Object.entries(climaticDomains[cycleName]).map(([key, value]) => (
          <div key={key} className="legend">
            <img alt="" className="legend-icon" src={`/img/mapLegend_${key}.svg`} />
            <div className="legend-key">{t(`climaticDomain.${key}`)}</div>
            <div className="legend-value">{value}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default KeyFindings
