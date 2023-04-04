import './MapVisualizerPanel.scss'
import React from 'react'

import GeoMenuItem from '../../GeoMapMenuItem'
import ForestLayerSection from './ForestLayerSection'
import ProtectedAreaLayerSection from './ProtectedAreaLayerSection'

const MapVisualizerPanel: React.FC = () => {
  return (
    <>
      <GeoMenuItem title="Forest Layers" checked={null} tabIndex={-1}>
        <ForestLayerSection />
      </GeoMenuItem>
      <GeoMenuItem title="Protected Area Layers" checked={null} tabIndex={-1}>
        <ProtectedAreaLayerSection />
      </GeoMenuItem>
    </>
  )
}

export default MapVisualizerPanel
