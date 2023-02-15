import './GeoMapMenuMosaic.scss'
import React, { useEffect, useRef } from 'react'

import { useAppDispatch } from '@client/store'
import {
  GeoActions,
  useAppliedMosaicOptions,
  useMosaicSelected,
  useMosaicUrl,
  useSelectedPanel,
} from '@client/store/ui/geo'
import { useCountryIso, useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuButton from '../GeoMapMenuButton'
import MosaicControl from './MosaicControl'

const GeoMapMenuMosaic: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPanel = useSelectedPanel()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(null)
  const mosaicSelected = useMosaicSelected()
  const mosaicLayerKey = 'mosaic'
  const countryIso = useCountryIso()
  const mosaicUrl = useMosaicUrl(countryIso)
  const appliedMosaicOptions = useAppliedMosaicOptions()

  // Reset MapController when map is loaded
  useEffect(() => {
    if (map) {
      mapControllerRef.current = new MapController(map)
    }
  }, [map])

  // Mosaic layer toggled, mosaicUrl updated or appliedMosaicOptions changed
  useEffect(() => {
    // console.log(mosaicSelected, appliedMosaicOptions, mosaicUrl, countryIso)
    // If map is still loading, stop
    if (!map) return

    // In any case, if there's an existing background layer, it should be removed
    mapControllerRef.current.removeLayer(mosaicLayerKey)

    // Mosaic layer not selected, so do nothing
    if (!mosaicSelected) {
      return
    }

    // Use existing mosaic url if available to avoid unnecessary Sepal calls
    if (mosaicUrl) {
      mapControllerRef.current.addSepalLayer(mosaicLayerKey, mosaicUrl)
      return
    }

    // Get mosaic url from Sepal
    if (appliedMosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions({ mosaicOptions: appliedMosaicOptions, countryIso }))
    }
  }, [mosaicSelected, appliedMosaicOptions, mosaicUrl, countryIso, map, dispatch])

  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="mosaic" text="Background" icon="radar" />
      {selectedPanel === 'mosaic' && <MosaicControl />}
    </div>
  )
}

export default GeoMapMenuMosaic
