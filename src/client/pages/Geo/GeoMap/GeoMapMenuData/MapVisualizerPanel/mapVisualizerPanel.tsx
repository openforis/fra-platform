import './mapVisualizerPanel.scss'
import React from 'react'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import AgreementLevelsControl from '../MapVisualizerAgreementLevelsControl'

// Just to display items for demo purposes
const layers = [
  { title: 'Copernicus (2019)' },
  { title: 'TanDEM-X (2019)' },
  { title: 'Hansen 10% (2020)' },
  { title: 'GlobeLand (2010)' },
  { title: 'Data Layer 5' },
  { title: 'Data Layer 6' },
  { title: 'Data Layer 7' },
  { title: 'Data Layer 8' },
]

const SatelliteSourcePanel: React.FC = () => {
  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Choose Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <GeoMapMenuListElement
            key={layer.title}
            title={layer.title}
            tabIndex={index * -1 - 1}
            checked={false}
            onCheckboxClick={() => null}
          />
        ))}
        <AgreementLevelsControl />
      </div>
      <div className="geo-map-menu-data-container-btn">
        <button type="button" className="btn btn-secondary geo-map-menu-data-btn-recipe">
          Save Recipe
        </button>
        <button type="button" className="btn btn-primary geo-map-menu-data-btn-display">
          Display
        </button>
      </div>
    </div>
  )
}

export default SatelliteSourcePanel
