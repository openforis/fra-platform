import './NavGeo.scss'
import React from 'react'

import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'
import GeoSection from 'client/components/Navigation/NavGeo/Sections'

const NavGeo: React.FC = () => {
  return (
    <div className="nav-geo">
      <GeoSection key="sateliteMosaic" sectionLabel="Satellite Mosaic">
        <SatelliteMosaic />
      </GeoSection>
    </div>
  )
}

export default NavGeo
