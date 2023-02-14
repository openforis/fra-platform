import React, { useEffect, useRef } from 'react'

import { useAppDispatch } from '@client/store'
import { GeoActions, useMosaicOptions, useMosaicUrl } from '@client/store/ui/geo'
import { useMosaicSelected } from '@client/store/ui/geo/hooks'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMenuItem from '../../GeoMapMenuItem'
import SatelliteSourcePanel from '../SatelliteSourcePanel'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const mosaicUrl = useMosaicUrl()
  const mosaicOptions = useMosaicOptions()
  const mosaicSelected = useMosaicSelected()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  const mosaicLayerKey = 'mosaic'

  // Mosaic layer toggled, mosaicUrl updated or mosaicOptions changed
  useEffect(() => {
    // Mosaic layer not selected, so remove layer from map if present
    if (!mosaicSelected) {
      mapControllerRef.current.removeLayer(mosaicLayerKey)
      return
    }

    // Use existing mosaic url if available to avoid unnecessary Sepal calls
    if (mosaicUrl) {
      mapControllerRef.current.addSepalLayer(mosaicLayerKey, mosaicUrl)
      return
    }

    // Get mosaic url from Sepal
    if (mosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions(mosaicOptions))
    }
  }, [mosaicSelected, mosaicOptions, mosaicUrl, dispatch])

  return (
    <div>
      <GeoMenuItem
        title="Show mosaic layer"
        checked={mosaicSelected}
        tabIndex={-1}
        onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
      >
        <SatelliteSourcePanel />
      </GeoMenuItem>
    </div>
  )
}

export default MosaicControl
