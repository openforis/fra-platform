import { useEffect } from 'react'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic'

import { MosaicActions } from 'client/store/geo/mosaic/actions'
import {
  useMosaicCountryUrl,
  useMosaicOptions,
  useMosaicSelected,
  useMosaicStatus,
} from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import { mapController } from 'client/utils'

export const useFetchMosaicLayer = () => {
  const dispatch = useAppDispatch()

  const mosaicOptions = useMosaicOptions()
  const countryIso = useCountryIso()
  const mosaicUrl = useMosaicCountryUrl(countryIso)
  const selected = useMosaicSelected()
  const status = useMosaicStatus()

  useEffect(() => {
    if (mapController.isMapUnavailable()) return

    if (!selected) return

    if (status === LayerFetchStatus.Loading) return
    if (status === LayerFetchStatus.Failed) return

    if (mosaicUrl) {
      mapController.addSepalLayer(MOSAIC_LAYER_KEY, mosaicUrl)
      return
    }
    if (Object.values(mosaicOptions.sources).some(Boolean)) {
      dispatch(MosaicActions.getUrlTemplate({ countryIso, mosaicOptions }))
    }
  }, [countryIso, dispatch, mosaicOptions, mosaicUrl, selected, status])
}
