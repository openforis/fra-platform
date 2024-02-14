import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { LayerKey } from 'meta/geo/layer'

import { RootState } from 'client/store/RootState'
import { GeoActions } from 'client/store/ui/geo/slice'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

type Params = {
  countryIso: CountryIso
  layerKey: LayerKey
  opacity: number
  sectionKey: LayerSectionKey
}

export const setLayerOpacity = createAsyncThunk<void, Params>(
  'geo/setLayerOpacity',
  async ({ countryIso, layerKey, opacity, sectionKey }, { dispatch, getState }) => {
    const state = getState()
    const layerState = (state as RootState).geo?.sections?.[sectionKey]?.[layerKey]

    if (layerState?.status === undefined || layerState?.status === LayerFetchStatus.Unfetched) {
      dispatch(GeoActions.postLayer({ countryIso, layerKey, sectionKey }))
    }

    dispatch(GeoActions.setLayerOpacityValue({ layerKey, opacity, sectionKey }))
  }
)
