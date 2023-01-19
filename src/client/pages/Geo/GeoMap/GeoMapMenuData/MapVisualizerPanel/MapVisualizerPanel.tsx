import './MapVisualizerPanel.scss'
import React, { useEffect, useRef } from 'react'

import { ForestSource } from '@meta/geo'
import { ForestSourceWithOptions, HansenPercentage } from '@meta/geo/forest'

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
  const hansenPercentageOnPreviousMapDraw = useRef<HansenPercentage>(forestOptions.hansenPercentage)
  // map.addListener('tilesloaded', () => setCheckboxDisabledState(false)) // tilesloaded doesn't wait for custom layers

  useEffect(() => {
    const hansenPercentageHasChanged = forestOptions.hansenPercentage !== hansenPercentageOnPreviousMapDraw.current

    layers.forEach(({ key: mapLayerKey, apiUri }) => {
      if (forestOptions.selected.includes(mapLayerKey) && forestOptions.opacity[mapLayerKey] !== 0) {
        // Layer is selected so ensure it's shown on map

        const isHansen = mapLayerKey === ForestSource.Hansen
        const key = mapLayerKey + (isHansen ? `__${forestOptions.hansenPercentage}` : '')
        const mapId = forestOptions.fetchedLayers[key]

        if (mapId) {
          // Cache hit, use cached value
          const overwrite = isHansen && hansenPercentageHasChanged
          if (overwrite) {
            hansenPercentageOnPreviousMapDraw.current = forestOptions.hansenPercentage
          }
          mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId, overwrite)
        } else {
          // Cache miss, fetch layer from server
          const source: ForestSourceWithOptions = {
            key: mapLayerKey,
            options: isHansen ? { gteHansenTreeCoverPerc: forestOptions.hansenPercentage.toString() } : {},
          }
          const query = Object.entries(source.options)
            .map(([key, value]) => `&${key}=${value}`)
            .join('')
          const uri = `${apiUri}${query}`

          dispatch(getForestLayer({ key, uri }))
          // Once getForestLayer is ready, the fetched mapId will be added to fetchedLayers,
          // retriggering this effect and leading to a cache hit.
        }
      } else {
        // Layer is not selected so ensure it's not shown on map
        mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)
      }
    })
  }, [
    forestOptions.selected,
    forestOptions.hansenPercentage,
    forestOptions.fetchedLayers,
    forestOptions.opacity,
    dispatch,
  ])

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => (
          <div key={layer.key}>
            <GeoMapMenuListElement
              title={layer.title}
              tabIndex={index * -1 - 1}
              checked={forestOptions.selected.includes(layer.key)}
              onCheckboxClick={() => dispatch(GeoActions.toggleForestLayer(layer.key))}
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
