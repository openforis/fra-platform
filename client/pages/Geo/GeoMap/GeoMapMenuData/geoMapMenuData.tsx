import './geoMapMenuData.scss'
import React from 'react'

import GeoMapMenuButton from '../GeoMapMenuButton'

// Placeholder for Data Layers menu

const GeoMapMenuData: React.FC = () => {
  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="data" text="Data Layers" />
    </div>
  )
}

export default GeoMapMenuData
