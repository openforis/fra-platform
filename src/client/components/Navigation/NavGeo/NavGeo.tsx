import React from 'react'

import { sections } from 'meta/geo'

import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import LayersSection from 'client/components/Navigation/NavGeo/LayersSection'
import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'

const NavGeo: React.FC = () => {
  return (
    <>
      <GeoSection key="geo-nav-section-satelliteMosaic" labelKey="geo.satelliteMosaic">
        <SatelliteMosaic />
      </GeoSection>
      {sections.map((layerSection) => {
        return (
          <GeoSection key={`geo-nav-section-${layerSection.key}`} labelKey={layerSection.titleKey}>
            <LayersSection section={layerSection} />
          </GeoSection>
        )
      })}
    </>
  )
}

export default NavGeo
