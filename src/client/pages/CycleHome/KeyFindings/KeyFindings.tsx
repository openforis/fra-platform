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
} as const

const translationParameters: Record<CycleName, Record<string, string | number>> = {
  '2020': {
    forestArea: '4.06',
    forestPerPerson: '0.52',
    totalLandArea: '31',
    tropicalArea: climaticDomains['2020'].tropical,
  },
  '2025': {
    forestArea: '4.14',
    forestPerPerson: '0.50',
    totalLandArea: '32',
    tropicalArea: climaticDomains['2025'].tropical,
  },
  latest: {
    forestArea: '4.14',
    forestPerPerson: '0.50',
    totalLandArea: '32',
    tropicalArea: climaticDomains.latest.tropical,
  },
} as const

const altText: Record<CycleName, string> = {
  '2020': '',
  '2025': 'home.mapAltText',
  latest: 'home.mapAltText',
} as const

const KeyFindings: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const searchParams = new URLSearchParams({ assessmentName, cycleName, countryIso: Global.WO })

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img
          key={cycleName}
          alt={t(altText[cycleName])}
          className="map"
          src={ApiEndPoint.Static.file(`fra/${cycleName}/landing/map.png?${searchParams.toString()}`)}
        />
      </div>

      <div>{t(`home.keyFindings`, translationParameters[cycleName])}</div>

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
