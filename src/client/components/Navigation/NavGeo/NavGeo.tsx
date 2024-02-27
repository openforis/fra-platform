import './NavGeo.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'
import GeoSection from 'client/components/Navigation/NavGeo/Sections'

const NavGeo: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="nav-geo">
      <GeoSection key="sateliteMosaic" label={t('geo.satelliteMosaic')}>
        <SatelliteMosaic />
      </GeoSection>
    </div>
  )
}

export default NavGeo
