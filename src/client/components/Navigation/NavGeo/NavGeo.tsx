import './NavGeo.scss'
import React from 'react'

import { sections } from 'meta/geo'

import Hr from 'client/components/Hr'
import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import LayersSection from 'client/components/Navigation/NavGeo/LayersSection'
import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'

const NavGeo: React.FC = () => {
  return (
    <div className="nav-geo">
      <GeoSection key="geo-nav-section-satelliteMosaic" labelKey="geo.satelliteMosaic">
        <SatelliteMosaic />
      </GeoSection>
      <Hr />
      {sections.map((layerSection, index) => {
        return (
          <React.Fragment key={`geo-nav-section-${layerSection.key}`}>
            <GeoSection labelKey={layerSection.titleKey}>
              <LayersSection section={layerSection} />
            </GeoSection>
            {index !== sections.length - 1 && <Hr />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default NavGeo
