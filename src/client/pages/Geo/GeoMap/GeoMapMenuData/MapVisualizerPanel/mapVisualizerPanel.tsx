import './mapVisualizerPanel.scss'
import React, { useCallback } from 'react'

// @ts-ignore
import ee from '@google/earthengine'
import axios from 'axios'

import { ForestSources } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'

// Just to display items for demo purposes
const layers = [
  { key: 'JAXA', title: 'JAXA (2017)', apiUri: '/api/geo/layers/forest/FIN/JAXA/' },
  { key: 'TandemX', title: 'TanDEM-X (2019)', apiUri: '/api/geo/layers/forest/FIN/TandemX/' },
  { key: 'GlobeLand', title: 'GloabeLand (2020)', apiUri: '/api/geo/layers/forest/FIN/GlobeLand/' },
  { key: 'ESAGlobCover', title: 'Global Land Cover ESA (2009)', apiUri: '/api/geo/layers/forest/FIN/ESAGlobCover/' },
  { key: 'Copernicus', title: 'Copernicus (2019)', apiUri: '/api/geo/layers/forest/FIN/Copernicus/' },
  { key: 'ESRI', title: 'ESRI (2020)', apiUri: '/api/geo/layers/forest/FIN/ESRI/' },
  { key: 'ESAWorldCover', title: 'ESA (2020)', apiUri: '/api/geo/layers/forest/FIN/ESAWorldCover/' },
  { key: 'Hansen', title: 'Hansen GFC (2020)', apiUri: '/api/geo/layers/forest/FIN/Hansen/10/' },
]

const queryOverlayLayer = (mapLayerId: string, overlayLayers: google.maps.MVCArray) => {
  for (let i = 0; i < overlayLayers.getLength(); i += 1) {
    const overlayLayer = overlayLayers.getAt(i)
    if (overlayLayer.name === mapLayerId) {
      return true
    }
  }
  return false
}

const removeOverlayLayer = (mapLayerId: string, overlayLayers: google.maps.MVCArray) => {
  for (let i = 0; i < overlayLayers.getLength(); i += 1) {
    const overlayLayer = overlayLayers.getAt(i)
    if (overlayLayer.name === mapLayerId) {
      overlayLayers.removeAt(i)

      break
    }
  }
}

const addOVerlayLayer = (map: google.maps.Map, mapId: string, mapLayerKey: string) => {
  const tileSource = new ee.layers.EarthEngineTileSource({
    mapid: mapId,
  })
  const overlay = new ee.layers.ImageOverlay(tileSource, { name: mapLayerKey })
  map.overlayMapTypes.push(overlay)
}

const MapVisualizerPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()

  const map = useGeoMap()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCheckboxClick = useCallback(
    async (apiUri: string, mapLayerKey: string, source: ForestSources) => {
      const forestOptionsCopy = { ...forestOptions }
      const sources = [...forestOptions.sources]

      if (queryOverlayLayer(mapLayerKey, map.overlayMapTypes)) {
        forestOptionsCopy.sources = sources.filter((el: ForestSources) => el !== source)
        if (!forestOptionsCopy.sources.includes(source)) {
          removeOverlayLayer(mapLayerKey, map.overlayMapTypes)
        }
      } else {
        await axios.get(apiUri).then((response) => {
          addOVerlayLayer(map, response.data.mapId, mapLayerKey)
          sources.push(source)
          forestOptionsCopy.sources = sources
        })
      }
      dispatch(GeoActions.updateForestOptions(forestOptionsCopy))
    },
    [dispatch, forestOptions, map]
  )

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <GeoMapMenuListElement
            key={layer.key}
            title={layer.title}
            tabIndex={index * -1 - 1}
            checked={forestOptions.sources.includes(layer.key)}
            onCheckboxClick={() => onCheckboxClick(layer.apiUri, layer.key, layer.key)}
            disabled={false}
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

export default MapVisualizerPanel
