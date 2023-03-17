import './MapVisualizerPanel.scss'
import React from 'react'

import GeoMenuItem from '../../GeoMapMenuItem'
import ForestLayerSection from './ForestLayerSection'

const MapVisualizerPanel: React.FC = () => {
  return (
    <GeoMenuItem title="Forest Layers" checked={null} tabIndex={-1}>
      <ForestLayerSection />
    </GeoMenuItem>
  )
}

export default MapVisualizerPanel
