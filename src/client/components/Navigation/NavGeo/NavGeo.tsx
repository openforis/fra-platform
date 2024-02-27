import './NavGeo.scss'
import React from 'react'

import Background from 'client/components/Navigation/NavGeo/Background'
import GeoSection from 'client/components/Navigation/NavGeo/Sections'

const NavGeo: React.FC = () => {
  return (
    <div className="nav-geo">
      <GeoSection key="background" showSections={false} sectionLabel="Background">
        <Background />
      </GeoSection>
    </div>
  )
}

export default NavGeo
