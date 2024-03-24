import './NavGeo.scss'
import React from 'react'

import { sections } from 'meta/geo'

import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import LayersSection from 'client/components/Navigation/NavGeo/LayersSection'
import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'

const NavGeo: React.FC = () => {
  return (
    <div className="nav-geo">
      <GeoSection key="geo-nav-section-satelliteMosaic" labelKey="geo.satelliteMosaic">
        <SatelliteMosaic />
      </GeoSection>

      {sections.map((section) => {
        return (
          <React.Fragment key={`geo-nav-section-${section.key}`}>
            <GeoSection labelKey={section.titleKey}>
              <LayersSection section={section} />
            </GeoSection>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default NavGeo
