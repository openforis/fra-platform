import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { ForestKey, LayerSectionKey } from 'meta/geo'
import { LayerKey } from 'meta/geo/layer'

import { RootState } from 'client/store/RootState'
import { GeoActions } from 'client/store/ui/geo/slice'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

type Params = {
  countryIso: CountryIso
  opacity: number
  sectionKey: LayerSectionKey
}

export const setSectionGlobalOpacity = createAsyncThunk<void, Params>(
  'geo/setSectionGlobalOpacity',
  async ({ countryIso, opacity, sectionKey }, { dispatch, getState }) => {
    const state = getState()
    const sectionState = (state as RootState).geo?.sections?.[sectionKey]

    Object.keys(sectionState ?? {}).forEach((layerKey: LayerKey) => {
      const layerState = sectionState?.[layerKey]

      if (layerKey === ForestKey.Agreement) return

      const layerSelectState = layerState?.selected
      if (layerSelectState === undefined || !layerSelectState) return // Ignore non-selected layers

      if (layerState?.status === undefined || layerState?.status === LayerFetchStatus.Unfetched) {
        dispatch(GeoActions.postLayer({ countryIso, layerKey, sectionKey }))
      }
      dispatch(GeoActions.setLayerOpacityValue({ layerKey, opacity, sectionKey }))
    })
  }
)
