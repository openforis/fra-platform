import './MapVisualizerPanel.scss'
import React, { useCallback, useEffect, useRef } from 'react'

import { ForestSource } from '@meta/geo'
import { ForestSourceWithOptions } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { getForestLayer } from '@client/store/ui/geo/actions'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import AgreementLevelsControl from '../MapVisualizerAgreementLevelsControl'
// import countryBoundingBoxes from './countryBounds'
import LayerOptionsPanel from './LayerOptionsPanel'
import { layers } from '.'

const MapVisualizerPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  // map.addListener('tilesloaded', () => setCheckboxDisabledState(false)) // tilesloaded doesn't wait for custom layers

  const toggleLayer = useCallback(
    async (apiUri: string, mapLayerKey: ForestSource, forceAddLayer = false) => {
      const wasExistingLayer = mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)

      if (wasExistingLayer) {
        // remove the existing layer from the app state
        dispatch(GeoActions.removeForestLayer(mapLayerKey))
        dispatch(GeoActions.resetOpacity(mapLayerKey))
        if (!forceAddLayer) return
      }

      // get the new layer from the server and add it to the map and app state
      const isHansen = mapLayerKey === ForestSource.Hansen
      const source: ForestSourceWithOptions = {
        key: mapLayerKey,
        options: isHansen ? { gteHansenTreeCoverPerc: forestOptions.hansenPercentage.toString() } : {},
      }
      const query = Object.entries(source.options)
        .map(([key, value]) => `&${key}=${value}`)
        .join('')
      const uri = `${apiUri}${query}`
      const key = mapLayerKey + (isHansen ? `__${forestOptions.hansenPercentage}` : '')
      const mapId = forestOptions.fetchedLayers[key]
      dispatch(GeoActions.addForestLayer({ key: mapLayerKey, status: mapId ? 'ready' : 'loading' }))

      if (mapId) {
        mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId)
      } else {
        dispatch(getForestLayer({ key, uri }))
      }
    },
    [forestOptions.fetchedLayers, forestOptions.hansenPercentage, dispatch]
  )

  useEffect(() => {
    forestOptions.selected
      .filter(({ status }) => status === 'loading')
      .forEach(({ key: mapLayerKey }) => {
        const key = mapLayerKey + (mapLayerKey === ForestSource.Hansen ? `__${forestOptions.hansenPercentage}` : '')
        const mapId = forestOptions.fetchedLayers[key]
        if (mapId) {
          dispatch(GeoActions.markForestLayerAsReady(mapLayerKey))
          mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId)
        }
      })
  }, [forestOptions.fetchedLayers, forestOptions.selected, forestOptions.hansenPercentage, dispatch])

  // re-render if Hansen percentage was changed
  useEffect(() => {
    // skip function if Hansen layer not selected or on 1st render
    const hansenLayerWasRemoved = mapControllerRef.current.removeEarthEngineLayer(ForestSource.Hansen)
    if (!hansenLayerWasRemoved) return

    // if Hansen layer was present, make another call with new option
    const layer = layers.filter((layer) => layer.key === ForestSource.Hansen)[0]
    toggleLayer(layer.apiUri, layer.key, true)
  }, [forestOptions.hansenPercentage, map.overlayMapTypes, toggleLayer])

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <div key={layer.key}>
            <GeoMapMenuListElement
              title={layer.title}
              tabIndex={index * -1 - 1}
              checked={forestOptions.selected.some(({ key }) => key === layer.key)}
              onCheckboxClick={() => toggleLayer(layer.apiUri, layer.key)}
              backgroundColor={layer.key.toLowerCase()}
            >
              <LayerOptionsPanel layerKey={layer.key} />
            </GeoMapMenuListElement>
          </div>
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

export default MapVisualizerPanel
