import './MapVisualizerPanel.scss'
import React from 'react'

import { sections } from 'meta/geo'

import GeoMenuItem from '../../GeoMapMenuItem'
import LayersSectionPanel from './LayersSectionPanel'

const MapVisualizerPanel: React.FC = () => {
  return (
    <div>
      {sections.map((layerSection) => {
        return (
          <GeoMenuItem key={layerSection.key} title={layerSection.title} checked={null} tabIndex={0}>
            <LayersSectionPanel section={layerSection} />
          </GeoMenuItem>
        )
      })}
    </div>
  )
}

export default MapVisualizerPanel
