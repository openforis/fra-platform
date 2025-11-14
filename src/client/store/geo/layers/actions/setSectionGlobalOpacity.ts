import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { ForestKey } from 'meta/geo/forest/key'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { sectionsMap } from 'meta/geo/sections'

import { setOpacity } from 'client/store/geo/layers/actions/setOpacity'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  countryIso: CountryIso
  opacity: number
  sectionKey: LayerSectionKey
}

export const setSectionGlobalOpacity = createAsyncThunk<void, Params, ThunkApiConfig>(
  'geo/layers/setSectionGlobalOpacity',
  async (params, { dispatch, getState }) => {
    const { countryIso, opacity, sectionKey } = params
    const sectionLayers = sectionsMap[sectionKey].layers

    const state = getState()

    sectionLayers.forEach((layer) => {
      const layerKey = layer.key

      if (layerKey === ForestKey.Agreement) return

      const layerState = LayersSelectors.getLayer(state, layerKey)

      if (layerState === undefined || !layerState?.selected) return // Ignore non-selected layers

      dispatch(setOpacity({ countryIso, layerKey, opacity, sectionKey }))
    })
  }
)
