import { useEffect } from 'react'

import { MosaicLayerKey } from 'meta/geo/mosaic'

import { useAppDispatch } from 'client/store'
import {
  GeoActions,
  useAppliedMosaicOptions,
  useMosaicSelected,
  useMosaicStatus,
  useMosaicUrl,
} from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import { mapController } from 'client/utils'

export const useFetchMosaicLayer = () => {
  const dispatch = useAppDispatch()

  const appliedMosaicOptions = useAppliedMosaicOptions()
  const countryIso = useCountryIso()
  const layerKey: MosaicLayerKey = 'mosaic'
  const mosaicUrl = useMosaicUrl(countryIso)
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
    if (appliedMosaicOptions.sources.length > 0) {
      dispatch(GeoActions.postMosaicOptions({ mosaicOptions: appliedMosaicOptions, countryIso }))
    }
  }, [appliedMosaicOptions, countryIso, dispatch, mosaicUrl, selected, status])
}
