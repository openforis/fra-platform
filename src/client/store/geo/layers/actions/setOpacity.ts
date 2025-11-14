import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { LayerKey } from 'meta/geo/layer/key'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  countryIso: CountryIso
  layerKey: LayerKey
  opacity: number
  sectionKey: LayerSectionKey
}

type Returned = Params

export const setOpacity = createAsyncThunk<Returned, Params, ThunkApiConfig>(
  'geo/layers/setOpacity',
  async (params, { dispatch, getState }) => {
    const { countryIso, layerKey, opacity, sectionKey } = params
    const state = getState()

    const layerState = LayersSelectors.getLayer(state, layerKey)
    const status = layerState?.status
    if (opacity > 0 && (status === undefined || status === LayerFetchStatus.Unfetched)) {
      dispatch(getLayerMapId({ countryIso, layerKey, sectionKey }))
    }

    return params
  }
)
