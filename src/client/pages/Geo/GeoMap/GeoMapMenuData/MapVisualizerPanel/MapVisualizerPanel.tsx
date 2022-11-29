import './MapVisualizerPanel.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import axios from 'axios'
import debounce from 'lodash.debounce'

import { ForestSource } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import AgreementLevelsControl from '../MapVisualizerAgreementLevelsControl'
// import countryBoundingBoxes from './countryBounds'
import LayerOptionsPanel from './LayerOptionsPanel'

// Just to display items for demo purposes
const layers: { key: ForestSource; title: string; apiUri: string; opacity: number }[] = [
  {
    key: ForestSource.JAXA,
    title: 'JAXA (2017)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=JAXA',
    opacity: 1,
  },
  {
    key: ForestSource.TandemX,
    title: 'TanDEM-X (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=TandemX',
    opacity: 1,
  },
  {
    key: ForestSource.GlobeLand,
    title: 'GlobeLand (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=GlobeLand',
    opacity: 1,
  },
  {
    key: ForestSource.ESAGlobCover,
    title: 'Global Land Cover ESA (2009)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAGlobCover',
    opacity: 1,
  },
  {
    key: ForestSource.Copernicus,
    title: 'Copernicus (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Copernicus',
    opacity: 1,
  },
  {
    key: ForestSource.ESRI,
    title: 'ESRI (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESRI',
    opacity: 1,
  },
  {
    key: ForestSource.ESAWorldCover,
    title: 'ESA (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAWorldCover',
    opacity: 1,
  },
  {
    key: ForestSource.Hansen,
    title: 'Hansen GFC (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Hansen',
    opacity: 1,
  },
]

const MapVisualizerPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const [hansenPercentage, setHansenPercentage] = useState(10)
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  // map.addListener('tilesloaded', () => setCheckboxDisabledState(false)) // tilesloaded doesn't wait for custom layers

  const onCheckboxClick = useCallback(
    async (apiUri: string, mapLayerKey: ForestSource) => {
      const wasExistingLayer = mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)

      if (wasExistingLayer) {
        // remove the existing layer from the app state
        dispatch(
          GeoActions.updateForestOptions({
            sources: forestOptions.sources.filter((s: ForestSource) => s !== mapLayerKey),
          })
        )
      } else {
        // get the new layer from the server and add it to the map and app state
        const uri = apiUri + mapLayerKey === 'Hansen' ? `&gteHansenTreeCoverPerc=${hansenPercentage}` : ''
        await axios.get(uri).then((response) => {
          const { mapId } = response.data
          mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId)
          dispatch(GeoActions.updateForestOptions({ sources: [...forestOptions.sources, mapLayerKey] }))
        })
      }
    },
    [dispatch, forestOptions, hansenPercentage]
  )

  // re-render if Hansen percentage was changed
  useEffect(() => {
    // skip function if Hansen layer not selected or on 1st render
    const hansenLayerWasRemoved = mapControllerRef.current.removeEarthEngineLayer('Hansen')
    if (!hansenLayerWasRemoved) return

    // if Hansen layer was present, make another call with new option
    const layer = layers.filter((layer) => layer.key === 'Hansen')[0]
    onCheckboxClick(layer.apiUri, layer.key)
  }, [hansenPercentage, map.overlayMapTypes, onCheckboxClick])

  const [debouncedSetHansenPercentage] = useState(() =>
    debounce(setHansenPercentage, 150, {
      leading: false,
      trailing: true,
    })
  )

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
              checked={forestOptions.sources.includes(layer.key as ForestSource)}
              onCheckboxClick={() => onCheckboxClick(layer.apiUri, layer.key)}
              backgroundColor={layer.key.toLowerCase()}
            >
              <LayerOptionsPanel
                forestLayerOpacity={layer.opacity}
                layerKey={layer.key}
                hansenPercentage={hansenPercentage}
                opacityChange={(layerKey: string, opacity: number) => opacityChange(layerKey, opacity)}
                setHansenPercentageCallback={(percentage: number) => debouncedSetHansenPercentage(percentage)}
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
