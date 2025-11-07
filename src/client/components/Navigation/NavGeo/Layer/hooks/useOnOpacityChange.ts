import React, { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { LayerMetaProps } from 'client/components/Navigation/NavGeo/Layer/types'

type Returned = (event: React.FormEvent<HTMLInputElement>) => void

export const useOnOpacityChange = (props: LayerMetaProps): Returned => {
  const { layerMeta, section } = props
  const { key: layerKey } = layerMeta
  const { key: sectionKey } = section

  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(
    (event) => {
      const newOpacity = Math.round(Number(event.currentTarget.value) / 10) / 10
      dispatch(LayersActions.setOpacity({ countryIso, layerKey, opacity: newOpacity, sectionKey }))
    },
    [countryIso, dispatch, layerKey, sectionKey]
  )
}
