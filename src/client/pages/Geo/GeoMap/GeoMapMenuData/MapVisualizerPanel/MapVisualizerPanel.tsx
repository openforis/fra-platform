import './MapVisualizerPanel.scss'
import React, { useCallback, useEffect, useRef } from 'react'

import { ForestSource } from '@meta/geo'

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
    async (apiUri: string, mapLayerKey: ForestSource) => {
      const wasExistingLayer = mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)

      if (wasExistingLayer) {
        // remove the existing layer from the app state
        dispatch(GeoActions.removeForestLayer(mapLayerKey))
      } else {
        // get the new layer from the server and add it to the map and app state
        const uri =
          apiUri + (mapLayerKey === 'Hansen' ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}` : '')
        const mapId = forestOptions.fetchedLayers[mapLayerKey]
        dispatch(GeoActions.addForestLayer({ key: mapLayerKey, status: mapId ? 'ready' : 'loading' }))

        if (mapId) {
          mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId)
        } else {
          dispatch(getForestLayer({ mapLayerKey, uri }))
        }
      }
    },
    [forestOptions.fetchedLayers, forestOptions.hansenPercentage, dispatch]
  )

  useEffect(() => {
    forestOptions.sources
      .filter(({ status }) => status === 'loading')
      .forEach(({ key }) => {
        const mapId = forestOptions.fetchedLayers[key]
        if (mapId) {
          dispatch(GeoActions.markForestLayerAsReady(key))
          mapControllerRef.current.addEarthEngineLayer(key, mapId)
        }
      })
  }, [forestOptions.fetchedLayers, forestOptions.sources, dispatch])

  // re-render if Hansen percentage was changed
  useEffect(() => {
    // skip function if Hansen layer not selected or on 1st render
    const hansenLayerWasRemoved = mapControllerRef.current.removeEarthEngineLayer('Hansen')
    if (!hansenLayerWasRemoved) return

    // if Hansen layer was present, make another call with new option
    const layer = layers.filter((layer) => layer.key === 'Hansen')[0]
    toggleLayer(layer.apiUri, layer.key)
  }, [forestOptions.hansenPercentage, map.overlayMapTypes, toggleLayer])

  const opacityChange = (layerKey: string, opacity: number) => {
    mapControllerRef.current.setEarthEngineLayerOpacity(layerKey, opacity)
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <div key={layer.key}>
            <GeoMapMenuListElement
              title={layer.title}
              tabIndex={index * -1 - 1}
              checked={forestOptions.sources.some(({ key }) => key === layer.key)}
              onCheckboxClick={() => toggleLayer(layer.apiUri, layer.key)}
              backgroundColor={layer.key.toLowerCase()}
            >
              <LayerOptionsPanel
                forestLayerOpacity={layer.opacity}
                layerKey={layer.key}
                opacityChange={(layerKey: string, opacity: number) => opacityChange(layerKey, opacity)}
              />
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
