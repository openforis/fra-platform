import './mapVisualizerPanel.scss'
import React from 'react'

import axios from 'axios'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'

// Just to display items for demo purposes
const layers = [
  { key: 'JAXA', title: 'JAXA (2017)', apiUri: '/api/geo/layers/forest/FIN/JAXA/' },
  { key: 'TandemX', title: 'TanDEM-X (2019)', apiUri: '/api/geo/layers/forest/FIN/TandemX/' },
  { key: 'GlobeLand', title: 'GloabeLand (2020)', apiUri: '/api/geo/layers/forest/FIN/GlobeLand/' },
  { key: 'ESAGlobCover', title: 'Global Land Cover ESA (2009)', apiUri: '/api/geo/layers/forest/FIN/ESAGlobCover/' },
  { key: 'Copernicus', title: 'Copernicus (2919)', apiUri: '/api/geo/layers/forest/FIN/Copernicus/' },
  { key: 'ESRI', title: 'ESRI (2020)', apiUri: '/api/geo/layers/forest/FIN/ESRI/' },
  { key: 'ESAWorldCover', title: 'ESA (2020)', apiUri: '/api/geo/layers/forest/FIN/ESAWorldCover/' },
  { key: 'Hansen', title: 'Hansen GFC (2020)', apiUri: '/api/geo/layers/forest/FIN/Hansen/10/' },
]

const SatelliteSourcePanel: React.FC = (disabled: boolean) => {
  const onCheckboxClick = async (apiUri: string) => {
    await axios.get(apiUri)
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Choose Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <GeoMapMenuListElement
            key={layer.key}
            title={layer.title}
            apiUri={layer.apiUri}
            tabIndex={index * -1 - 1}
            checked={false}
            disabled={disabled}
            onCheckboxClick={() => onCheckboxClick(layer.apiUri)}
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
