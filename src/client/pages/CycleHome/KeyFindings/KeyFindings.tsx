import './keyFindings.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import MapLegend from 'client/pages/CycleHome/KeyFindings/MapLegend'

const climaticDomains: Record<CycleName, Record<string, number>> = {
  [CycleNames._2020]: { tropical: 45, boreal: 27, temperate: 16, subtropical: 11 },
  [CycleNames._2025]: { tropical: 45, boreal: 28, temperate: 17, subtropical: 11 },
  [CycleNames.latest]: { tropical: 45, boreal: 28, temperate: 17, subtropical: 11 },
  [CycleNames.latest2]: { tropical: 45, boreal: 28, temperate: 17, subtropical: 11 },
} as const

const translationParameters: Record<CycleName, Record<string, string | number>> = {
  [CycleNames._2020]: {
    forestArea: '4.06',
    forestPerPerson: '0.52',
    totalLandArea: '31',
    tropicalArea: climaticDomains['2020'].tropical,
  },
  [CycleNames._2025]: {
    forestArea: '4.14',
    forestPerPerson: '0.50',
    totalLandArea: '32',
    tropicalArea: climaticDomains['2025'].tropical,
  },
  [CycleNames.latest]: {
    forestArea: '4.14',
    forestPerPerson: '0.50',
    totalLandArea: '32',
    tropicalArea: climaticDomains.latest.tropical,
  },
  [CycleNames.latest2]: {
    forestArea: '4.14',
    forestPerPerson: '0.50',
    totalLandArea: '32',
    tropicalArea: climaticDomains.latest2.tropical,
  },
} as const

const altText: Record<CycleName, string> = {
  [CycleNames._2020]: '',
  [CycleNames._2025]: 'home.mapAltText',
  [CycleNames.latest]: 'home.mapAltText',
  [CycleNames.latest2]: 'home.mapAltText',
} as const

const KeyFindings: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img
          key={cycleName}
          alt={t(altText[cycleName])}
          className="map"
          src={`/img/${assessmentName}/${cycleName}/landing/map.png`}
        />
      </div>

      <div>{t(`home.keyFindings`, translationParameters[cycleName])}</div>

      <div className="home-key-findings__map-legend">
        {Object.entries(climaticDomains[cycleName]).map(([key, value]) => (
          <MapLegend key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  )
}
export default KeyFindings
