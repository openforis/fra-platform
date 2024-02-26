import './GeoMapMenuMosaic.scss'
import React, { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import {
  GeoActions,
  useAppliedMosaicOptions,
  useMosaicFailed,
  useMosaicPending,
  useMosaicSelected,
  useMosaicUrl,
  useSelectedPanel,
} from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import { mapController } from 'client/utils'

import GeoMapMenuButton from '../GeoMapMenuButton'
import MosaicControl from './MosaicControl'

const GeoMapMenuMosaic: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPanel = useSelectedPanel()
  const mosaicSelected = useMosaicSelected()
  const mosaicPending = useMosaicPending()
  const mosaicFailed = useMosaicFailed()
  const mosaicLayerKey = 'mosaic'
  const countryIso = useCountryIso()
  const mosaicUrl = useMosaicUrl(countryIso)
  const appliedMosaicOptions = useAppliedMosaicOptions()

  // Mosaic layer toggled, mosaicUrl updated or appliedMosaicOptions changed
  useEffect(() => {
    // If map the is still loading or the controller is not set, stop
    if (mapController.isMapUnavailable()) return

    // In any case, if there's an existing background layer, it should be removed
    mapController.removeLayer(mosaicLayerKey)

    // Mosaic layer not selected, so do nothing
    if (!mosaicSelected) return

    // Mosaic layer is being fetched
    if (mosaicPending) return

    // Mosaic layer fetch failed, so skip until user retries
    if (mosaicFailed) return

    // Use existing mosaic url if available to avoid unnecessary Sepal calls
    if (mosaicUrl) {
      mapController.addSepalLayer(mosaicLayerKey, mosaicUrl)
      return
    }

    // Get mosaic url from Sepal
    if (appliedMosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions({ mosaicOptions: appliedMosaicOptions, countryIso }))
    }
  }, [mosaicSelected, mosaicPending, mosaicFailed, appliedMosaicOptions, mosaicUrl, countryIso, dispatch])

  let status = null
  if (mosaicPending) status = LayerFetchStatus.Loading
  if (mosaicUrl) status = LayerFetchStatus.Ready
  if (mosaicFailed) status = LayerFetchStatus.Failed
  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="mosaic" text="Background" icon="radar" />
      {selectedPanel === 'mosaic' && <MosaicControl loadingStatus={status} />}
    </div>
  )
}

export default GeoMapMenuMosaic
