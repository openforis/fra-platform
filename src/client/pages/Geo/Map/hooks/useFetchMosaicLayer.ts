import { useEffect } from 'react'

import { MosaicLayerKey } from 'meta/geo/mosaic'

import {
  useMosaicCountryUrl,
  useMosaicOptions,
  useMosaicSelected,
  useMosaicStatus,
} from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { GeoActions } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import { mapController } from 'client/utils'

export const useFetchMosaicLayer = () => {
  const dispatch = useAppDispatch()

  const mosaicOptions = useMosaicOptions()
  const countryIso = useCountryIso()
  const layerKey: MosaicLayerKey = 'mosaic'
  const mosaicUrl = useMosaicCountryUrl(countryIso)
  const selected = useMosaicSelected()
  const status = useMosaicStatus()

  useEffect(() => {
    if (mapController.isMapUnavailable()) return

    if (!selected) return

    if (status === LayerFetchStatus.Loading) return
    if (status === LayerFetchStatus.Failed) return

    if (mosaicUrl) {
      mapController.addSepalLayer(layerKey, mosaicUrl)
      return
    }
    if (mosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions({ mosaicOptions, countryIso }))
    }
  }, [countryIso, dispatch, mosaicOptions, mosaicUrl, selected, status])
}
