import './NavGeo.scss'
import React from 'react'

import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'

const NavGeo: React.FC = () => {
  return (
    <div className="nav-geo">
      <GeoSection key="geo-nav-section-satelliteMosaic" labelKey="geo.satelliteMosaic">
        <SatelliteMosaic />
      </GeoSection>
    </div>
  )
}

export default NavGeo
