import './mapVisualizerPanel.scss'
import React, { useCallback } from 'react'

// @ts-ignore
import ee from '@google/earthengine'
import axios from 'axios'

import { ForestSource, Layer } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import LayerOptionsPanel from './LayerOptionsPanel'

// Just to display items for demo purposes
const layers = [
  { key: 'JAXA', title: 'JAXA (2017)', apiUri: '/api/geo/layers/forest/FIN/JAXA/', opacity: 1 },
  { key: 'TandemX', title: 'TanDEM-X (2019)', apiUri: '/api/geo/layers/forest/FIN/TandemX/', opacity: 1 },
  { key: 'GlobeLand', title: 'GloabeLand (2020)', apiUri: '/api/geo/layers/forest/FIN/GlobeLand/', opacity: 1 },
  {
    key: 'ESAGlobCover',
    title: 'Global Land Cover ESA (2009)',
    apiUri: '/api/geo/layers/forest/FIN/ESAGlobCover/',
    opacity: 1,
  },
  { key: 'Copernicus', title: 'Copernicus (2019)', apiUri: '/api/geo/layers/forest/FIN/Copernicus/', opacity: 1 },
  { key: 'ESRI', title: 'ESRI (2020)', apiUri: '/api/geo/layers/forest/FIN/ESRI/', opacity: 1 },
  { key: 'ESAWorldCover', title: 'ESA (2020)', apiUri: '/api/geo/layers/forest/FIN/ESAWorldCover/', opacity: 1 },
  { key: 'Hansen', title: 'Hansen GFC (2020)', apiUri: '/api/geo/layers/forest/FIN/Hansen/10/', opacity: 1 },
]

const checkRemoveOverlayLayer = (
  mapLayerId: string,
  overlayLayers: google.maps.MVCArray,
  remove = false,
  opacity = 1
) => {
  for (let i = 0; i < overlayLayers.getLength(); i += 1) {
    const overlayLayer = overlayLayers.getAt(i)
    if (overlayLayer.name === mapLayerId) {
      if (remove) overlayLayers.removeAt(i)
      overlayLayer.setOpacity(opacity)
      return true
    }
  }
  return false
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
  // map.addListener('tilesloaded', () => setCheckboxDisabledState(false)) // tilesloaded doesn't wait for custom layers

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCheckboxClick = useCallback(
    async (apiUri: string, mapLayerKey: string, source: ForestSource) => {
      const forestOptionsCopy = { ...forestOptions }
      const sources = [...forestOptions.sources]

      if (checkRemoveOverlayLayer(mapLayerKey, map.overlayMapTypes)) {
        forestOptionsCopy.sources = sources.filter((el: ForestSource) => el !== source)
        if (!forestOptionsCopy.sources.includes(source)) {
          checkRemoveOverlayLayer(mapLayerKey, map.overlayMapTypes, true)
        }
      } else {
        await axios.get(apiUri).then((response) => {
          const layer: Layer = {
            mapId: response.data.mapId,
            palette: response.data.palette,
            year: response.data.year,
            citation: response.data.citation,
          }
          addOVerlayLayer(map, layer.mapId, mapLayerKey)
          sources.push(source)
          forestOptionsCopy.sources = sources
        })
      }
      dispatch(GeoActions.updateForestOptions(forestOptionsCopy))
    },
    [dispatch, forestOptions, map]
  )

  const opacityChange = (layerKey: string, opacity: number) => {
    checkRemoveOverlayLayer(layerKey, map.overlayMapTypes, false, opacity)
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <div>
            <GeoMapMenuListElement
              key={layer.key}
              title={layer.title}
              opacity={layer.opacity}
              tabIndex={index * -1 - 1}
              checked={forestOptions.sources.includes(layer.key as ForestSource)}
              onCheckboxClick={() => onCheckboxClick(layer.apiUri, layer.key, layer.key as ForestSource)}
            >
              <LayerOptionsPanel
                forestLayerOpacity={layer.opacity}
                opacityChange={(layerKey: string, opacity: number) => opacityChange(layerKey, opacity)}
                layerKey={layer.key}
              />
            </GeoMapMenuListElement>
          </div>
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
