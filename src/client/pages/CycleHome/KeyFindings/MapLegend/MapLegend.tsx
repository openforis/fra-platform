import './MapLegend.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Boreal from './Legend/Boreal'
import Subtropical from './Legend/Subtropical'
import Temperate from './Legend/Temperate'
import Tropical from './Legend/Tropical'

type Props = {
  name: string
  value: number
}

const legendIcons: Record<string, React.FC> = {
  boreal: Boreal,
  subtropical: Subtropical,
  temperate: Temperate,
  tropical: Tropical,
}

const MapLegend: React.FC<Props> = (props: Props) => {
  const { name, value } = props

  const { t } = useTranslation()

  const IconComponent = legendIcons[name]

  return (
    <div className="legend">
      <div className="legend-icon">{IconComponent && <IconComponent />}</div>
      <div className="legend-key">{t(`climaticDomain.${name}`)}</div>
      <div className="legend-value">{value}%</div>
    </div>
  )
}

export default MapLegend
