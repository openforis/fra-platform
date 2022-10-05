import './geoMapMenuData.scss'
import React from 'react'

import { useSelectedPanel } from '@client/store/ui/geo'

import GeoMapMenuButton from '../GeoMapMenuButton'
import GeoMenuItem from '../GeoMapMenuItem'
import MapVisualizerPanel from './MapVisualizerPanel'

const GeoMapMenuData: React.FC = () => {
  const selectedPanel = useSelectedPanel()

  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="data" text="Data Layers" icon="layers" />
      {selectedPanel === 'data' && (
        <div>
          <GeoMenuItem title="Forest Cover" tabIndex={-1}>
            <MapVisualizerPanel />
          </GeoMenuItem>
          <div className="geo-map-menu-separator" />
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuData
