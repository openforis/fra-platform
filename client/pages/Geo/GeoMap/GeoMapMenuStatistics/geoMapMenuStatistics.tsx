import './geoMapMenuStatistics.scss'
import React from 'react'

import GeoMapMenuButton from '../GeoMapMenuButton'

// Placeholder for Data Layers menu

const GeoMapMenuStatistics: React.FC = () => {
  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="statistics" text="Statistics" icon="histogram" />
    </div>
  )
}

export default GeoMapMenuStatistics
