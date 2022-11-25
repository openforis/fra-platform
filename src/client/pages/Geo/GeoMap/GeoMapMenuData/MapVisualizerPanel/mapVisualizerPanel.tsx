import './mapVisualizerPanel.scss'
import React, { useCallback, useEffect, useState } from 'react'

// @ts-ignore
import ee from '@google/earthengine'
import axios from 'axios'
import debounce from 'lodash.debounce'

import { ForestSource, Layer } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import AgreementLevelsControl from '../MapVisualizerAgreementLevelsControl'
// import countryBoundingBoxes from './countryBounds'
import LayerOptionsPanel from './LayerOptionsPanel'

// Just to display items for demo purposes
const layers = [
  { key: 'JAXA', title: 'JAXA (2017)', apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=JAXA', opacity: 1 },
  {
    key: 'TandemX',
    title: 'TanDEM-X (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=TandemX',
    opacity: 1,
  },
  {
    key: 'GlobeLand',
    title: 'GlobeLand (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=GlobeLand',
    opacity: 1,
  },
  {
    key: 'ESAGlobCover',
    title: 'Global Land Cover ESA (2009)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAGlobCover',
    opacity: 1,
  },
  {
    key: 'Copernicus',
    title: 'Copernicus (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Copernicus',
    opacity: 1,
  },
  { key: 'ESRI', title: 'ESRI (2020)', apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESRI', opacity: 1 },
  {
    key: 'ESAWorldCover',
    title: 'ESA (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAWorldCover',
    opacity: 1,
  },
  {
    key: 'Hansen',
    title: 'Hansen GFC (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Hansen',
    opacity: 1,
  },
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
  // map.panToBounds(new google.maps.LatLngBounds(countryBoundingBoxes["FI"])) // bound to box
}

const MapVisualizerPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const [hansenPercentage, setHansenPercentage] = useState(10)
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
        let uri = apiUri
        if (mapLayerKey === 'Hansen') uri += `&gteHansenTreeCoverPerc=${hansenPercentage}`
        await axios.get(uri).then((response) => {
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
    [dispatch, forestOptions, hansenPercentage, map]
  )

  useEffect(() => {
    // skip function if Hansen layer not selected or on 1st render
    if (!checkRemoveOverlayLayer('Hansen', map.overlayMapTypes)) return
    // if Hansen layer present, remove it and make another call with new option
    checkRemoveOverlayLayer('Hansen', map.overlayMapTypes, true)
    const layer = layers.filter((layer) => layer.key === 'Hansen')[0]
    onCheckboxClick(layer.apiUri, layer.key, layer.key as ForestSource)
  }, [hansenPercentage, map.overlayMapTypes, onCheckboxClick])

  const [debouncedSetHansenPercentage] = useState(() =>
    debounce(setHansenPercentage, 150, {
      leading: false,
      trailing: true,
    })
  )

  const opacityChange = (layerKey: string, opacity: number) => {
    checkRemoveOverlayLayer(layerKey, map.overlayMapTypes, false, opacity)
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
              onCheckboxClick={() => onCheckboxClick(layer.apiUri, layer.key, layer.key as ForestSource)}
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
