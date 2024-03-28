import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { LayerMetaProps } from 'client/components/Navigation/NavGeo/Layer/types'

type Returned = () => void

export const useToggleLayer = (props: LayerMetaProps): Returned => {
  const { layerMeta, section } = props

  const { key: layerKey, fetchOnSelect } = layerMeta
  const { key: sectionKey } = section

  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(() => {
    if (fetchOnSelect) {
      dispatch(GeoActions.toggleLayer({ fetchLayerParams: { countryIso }, layerKey, sectionKey }))
    } else {
      dispatch(GeoActions.toggleLayer({ layerKey, sectionKey }))
    }
  }, [countryIso, dispatch, fetchOnSelect, layerKey, sectionKey])
}
