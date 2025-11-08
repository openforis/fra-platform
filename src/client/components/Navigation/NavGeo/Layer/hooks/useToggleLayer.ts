import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { LayerMetaProps } from 'client/components/Navigation/NavGeo/Layer/types'

type Returned = () => void

export const useToggleLayer = (props: LayerMetaProps): Returned => {
  const { layerMeta, section } = props

  const { fetchOnSelect, key: layerKey } = layerMeta
  const { key: sectionKey } = section

  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(() => {
    if (fetchOnSelect) {
      dispatch(LayersActions.toggleLayer({ fetchLayerParams: { countryIso }, layerKey, sectionKey }))
    } else {
      dispatch(LayersActions.toggleLayer({ layerKey, sectionKey }))
    }
  }, [countryIso, dispatch, fetchOnSelect, layerKey, sectionKey])
}
