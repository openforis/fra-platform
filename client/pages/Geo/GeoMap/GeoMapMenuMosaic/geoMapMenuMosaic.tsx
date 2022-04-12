import './geoMapMenuMosaic.scss'
import React, { useEffect, useCallback } from 'react'

import { useGeoMap } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { GeoActions, useMosaicOptions, useMosaicUrl, useSelectedPanel } from '@client/store/ui/geo'
import { MosaicSource } from '@meta/geo'
import GeoMapMenuButton from '../GeoMapMenuButton'

const removeOverlayLayer = (mapLayerId: string, overlayLayers: google.maps.MVCArray) => {
  for (let i = 0; i < overlayLayers.getLength(); i += 1) {
    const overlayLayer = overlayLayers.getAt(i)
    if (overlayLayer.name === mapLayerId) {
      overlayLayers.removeAt(i)

      break
    }
  }
}

const addOVerlayLayer = (mapLayerId: string, layerUrl: string, overlayLayers: google.maps.MVCArray) => {
  const layer = new google.maps.ImageMapType({
    name: mapLayerId,
    getTileUrl: (coord: google.maps.Point, zoom: number) => {
      const url = layerUrl.replace('{x}', String(coord.x)).replace('{y}', String(coord.y)).replace('{z}', String(zoom))
      return url
    },
    tileSize: new google.maps.Size(256, 256),
    minZoom: 1,
    maxZoom: 20,
  })

  overlayLayers.push(layer)
}

const GeoMapMenuMosaic: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPanel = useSelectedPanel()
  const mosaicUrl = useMosaicUrl()
  const mosaicOptions = useMosaicOptions()
  const map = useGeoMap()

  useEffect(() => {
    if (mosaicUrl) {
      addOVerlayLayer('mosaic', mosaicUrl, map.overlayMapTypes)
    }
  }, [mosaicUrl])

  useEffect(() => {
    if (mosaicOptions && mosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions(mosaicOptions))
    }
  }, [mosaicOptions])

  const handleClickSource = useCallback(
    (source: MosaicSource) => {
      const mosaicOptionsCopy = { ...mosaicOptions }
      const sources = [...mosaicOptions.sources]

      if (mosaicOptions.sources.includes(source)) {
        mosaicOptionsCopy.sources = sources.filter((el: MosaicSource) => el !== source)
        if (mosaicOptionsCopy.sources.length === 0) {
          removeOverlayLayer('mosaic', map.overlayMapTypes)
        }
      } else {
        sources.push(source)
        mosaicOptionsCopy.sources = sources
      }

      dispatch(GeoActions.updateMosaicOptions(mosaicOptionsCopy))
    },
    [mosaicOptions]
  )

  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="mosaic" text="Background" />
      {selectedPanel === 'mosaic' && (
        <div className="geo-map-menu-mosaic-select-container">
          <div
            role="checkbox"
            aria-checked={mosaicOptions.sources.includes('sentinel')}
            tabIndex={-1}
            onClick={() => handleClickSource('sentinel')}
            onKeyDown={() => handleClickSource('sentinel')}
          >
            <div className={`fra-checkbox${mosaicOptions.sources.includes('sentinel') ? ' checked' : ''}`} />
            <p>Sentinel</p>
          </div>
          <div
            role="checkbox"
            aria-checked={mosaicOptions.sources.includes('landsat')}
            tabIndex={-2}
            onClick={() => handleClickSource('landsat')}
            onKeyDown={() => handleClickSource('landsat')}
          >
            <div className={`fra-checkbox${mosaicOptions.sources.includes('landsat') ? ' checked' : ''}`} />
            <p>Landsat</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuMosaic
