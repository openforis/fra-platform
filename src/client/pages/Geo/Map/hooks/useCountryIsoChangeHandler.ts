import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { useAppDispatch } from 'client/store/hooks'
import { GeoActions, useGeoLayerSections } from 'client/store/ui/geo'
import { useCountryIso, usePrevious } from 'client/hooks'

export const useCountryIsoChangeHandler = () => {
  const countryIso = useCountryIso()
  const prevCountryIso = usePrevious(countryIso)
  const dispatch = useAppDispatch()
  const allSectionsState = useGeoLayerSections()

  useEffect(() => {
    if (prevCountryIso === countryIso) return

    dispatch(GeoActions.resetAllLayersStatus())
    dispatch(MosaicActions.resetUrlTemplate())

    Object.keys(allSectionsState ?? {}).forEach((sectionKey) => {
      Object.keys(allSectionsState[sectionKey as LayerSectionKey]).forEach((layerKey) => {
        const layerState = allSectionsState[sectionKey as LayerSectionKey][layerKey as LayerKey]
        if (!layerState.selected || (layerState.opacity ?? 0) === 0) return

        dispatch(
          GeoActions.postLayer({
            countryIso,
            sectionKey: sectionKey as LayerSectionKey,
            layerKey: layerKey as LayerKey,
          })
        )
      })
    })
  }, [allSectionsState, countryIso, dispatch, prevCountryIso])
}

export default useCountryIsoChangeHandler
