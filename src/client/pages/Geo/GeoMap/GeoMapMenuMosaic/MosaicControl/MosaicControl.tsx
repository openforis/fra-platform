import React, { useEffect, useRef } from 'react'

import { useAppDispatch } from '@client/store'
import { GeoActions, useAppliedMosaicOptions, useMosaicSelected, useMosaicUrl } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMenuItem from '../../GeoMapMenuItem'
import SatelliteSourcePanel from '../SatelliteSourcePanel'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const mosaicUrl = useMosaicUrl()
  const appliedMosaicOptions = useAppliedMosaicOptions()
  const mosaicSelected = useMosaicSelected()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  const mosaicLayerKey = 'mosaic'

  // Mosaic layer toggled, mosaicUrl updated or appliedMosaicOptions changed
  useEffect(() => {
    // console.log(mosaicSelected, appliedMosaicOptions, mosaicUrl)
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
      dispatch(GeoActions.postMosaicOptions(appliedMosaicOptions))
    }
  }, [mosaicSelected, appliedMosaicOptions, mosaicUrl, dispatch])

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
