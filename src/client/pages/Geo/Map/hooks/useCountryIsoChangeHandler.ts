import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { sections } from 'meta/geo/sections'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayers } from 'client/store/geo/layers/hooks/layers'
import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { useMosaicSelected } from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
import { usePrevious } from 'client/hooks/previous'

export const useCountryIsoChangeHandler = (): void => {
  const countryIso = useCountryIso()
  const prevCountryIso = usePrevious(countryIso)
  const dispatch = useAppDispatch()
  const layersState = useGeoLayers()
  const mosaicSelected = useMosaicSelected()

  useEffect(() => {
    if (prevCountryIso === countryIso) return

    dispatch(LayersActions.resetAllLayersStatus())

    sections.forEach(({ key: sectionKey, layers }) => {
      layers.forEach(({ key: layerKey }) => {
        const layerState = layersState[layerKey]
        if (Objects.isEmpty(layerState)) return

        if (!layerState.selected || (layerState.opacity ?? 0) === 0) return

        dispatch(
          LayersActions.getLayerMapId({
            countryIso,
            sectionKey,
            layerKey,
          })
        )
      })
    })
  }, [countryIso, dispatch, layersState, prevCountryIso])

  useEffect(() => {
    if (prevCountryIso === countryIso) return
    dispatch(MosaicActions.resetUrlTemplateData())
    if (!mosaicSelected) return
    dispatch(MosaicActions.getUrlTemplate({ countryIso }))
  }, [countryIso, dispatch, mosaicSelected, prevCountryIso])
}

export default useCountryIsoChangeHandler
