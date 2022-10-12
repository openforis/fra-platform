import './mapVisualizerPanel.scss'
import React from 'react'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'

// Just to display items for demo purposes
const layers = [
  { key: 'JAXA', title: 'JAXA (2017)', apiUri: '/api/geo/layers/forest/FIN/JAXA/' },
  { key: 'TandemX', title: 'TanDEM-X (2019)' },
  { key: 'GlobeLand', title: 'GloabeLand (2020)' },
  { key: 'ESAGlobCover', title: 'Global Land Cover ESA (2009)' },
  { key: 'Copernicus', title: 'Copernicus (2919)' },
  { key: 'ESRI', title: 'ESRI (2020)' },
  { key: 'ESAWorldCover', title: 'ESA (2020)' },
  { key: 'Hansen', title: 'Hansen GFC (2020)' },
]

const SatelliteSourcePanel: React.FC = () => {
  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Choose Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <GeoMapMenuListElement
            key={layer.key}
            title={layer.title}
            tabIndex={index * -1 - 1}
            checked={false}
            onCheckboxClick={() => null}
          />
        ))}
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
