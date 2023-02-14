import './geoMapMenuMosaic.scss'
import React, { useEffect, useRef } from 'react'

import { useAppDispatch } from '@client/store'
import { GeoActions, useMosaicOptions, useMosaicUrl, useSelectedPanel } from '@client/store/ui/geo'
import { useMosaicSelected } from '@client/store/ui/geo/hooks'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuButton from '../GeoMapMenuButton'
import GeoMenuItem from '../GeoMapMenuItem'
import SatelliteSourcePanel from './SatelliteSourcePanel'

const GeoMapMenuMosaic: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPanel = useSelectedPanel()
  const mosaicUrl = useMosaicUrl()
  const mosaicOptions = useMosaicOptions()
  const mosaicSelected = useMosaicSelected()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  const mosaicLayerKey = 'mosaic'

  // Mosaic layer toggled, mosaicUrl updated or mosaicOptions changed
  useEffect(() => {
    // console.log('mosaic', mosaicSelected)
    // console.log('url', mosaicUrl)

    // Mosaic layer not selected, so remove layer from map if present
    if (!mosaicSelected) {
      mapControllerRef.current.removeLayer(mosaicLayerKey)
      return
    }

    if (mosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions(mosaicOptions))
    }
  }, [mosaicSelected, mosaicOptions, mosaicUrl, dispatch])
  /*
  useEffect(() => {
    console.log('effect1', mosaicUrl)
    if (mosaicUrl) {
      addOVerlayLayer('mosaic', mosaicUrl, map.overlayMapTypes)
    }
  }, [mosaicUrl])

  useEffect(() => {
    console.log('effect2', mosaicOptions)
    if (mosaicOptions && mosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions(mosaicOptions))
    }
  }, [mosaicOptions])

  const handleClickSource = useCallback(
    (source: MosaicSource) => {
      console.log('click source')
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
  */

  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="mosaic" text="Background" icon="radar" />
      {selectedPanel === 'mosaic' && (
        <div>
          <GeoMenuItem
            title="Show mosaic layer"
            checked={mosaicSelected}
            tabIndex={-1}
            onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
          >
            <SatelliteSourcePanel />
          </GeoMenuItem>
          {/* <div className="geo-map-menu-separator" />
          <GeoMenuItem
            title="Landsat"
            checked={mosaicOptions.sources.includes('landsat')}
            tabIndex={-3}
            onCheckboxClick={() => handleClickSource('landsat')}
          >
            <SatelliteSourcePanel />
      </GeoMenuItem>  */}
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuMosaic
