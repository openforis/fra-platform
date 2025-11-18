import { createAsyncThunk } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { ForestKey } from 'meta/geo/forest/key'
import { Recipe } from 'meta/geo/layer/recipe'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { sectionsMap } from 'meta/geo/sections'

import { LayersActions } from 'client/store/geo/layers/actions'
import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Params = {
  countryIso: CountryIso
  recipe: Recipe
  recipeName: string
  sectionKey: LayerSectionKey
}

export const setSectionRecipe = createAsyncThunk<Params, Params, ThunkApiConfig>(
  'geo/recipes/setSectionRecipe',
  async (params, { dispatch, getState }) => {
    const { countryIso, recipe, sectionKey } = params
    const state = getState()
    const layersState = LayersSelectors.getLayers(state)
    const recipeLayersSet = new Set()

    // Select all layers that are part of the recipe
    recipe.layers.forEach((layer) => {
      const layerKey = layer.key
      const layerState = layersState[layerKey]

      dispatch(LayersActions.setOpacity({ countryIso, layerKey, opacity: 0, sectionKey }))
      if (!layerState?.selected) {
        dispatch(LayersActions.setProperty({ key: 'selected', layerKey, value: true }))
      }

      if (!Objects.isEmpty(layer.options)) {
        dispatch(LayersActions.setProperty({ layerKey, key: 'options', value: layer.options }))
      }

      recipeLayersSet.add(layerKey)
    })

    // Setup the agreement layer
    const agreementLayerKey = ForestKey.Agreement
    const agreementLayerState = LayersSelectors.getLayer(state, agreementLayerKey)

    dispatch(LayersActions.setProperty({ key: 'selected', layerKey: agreementLayerKey, value: true }))

    if (Objects.isEmpty(agreementLayerState?.opacity)) {
      dispatch(LayersActions.setProperty({ key: 'opacity', layerKey: agreementLayerKey, value: 1 }))
    }

    const currentLevel = agreementLayerState?.options?.agreementLayer?.level ?? 1
    const newLevel = Math.min(currentLevel, recipeLayersSet.size)
    dispatch(LayersActions.setAgreementProperty({ key: 'level', layerKey: agreementLayerKey, value: newLevel }))

    // Unselect all layers that are not part of the recipe
    const sectionLayers = sectionsMap[sectionKey].layers
    sectionLayers.forEach(({ key: layerKey }) => {
      if (recipeLayersSet.has(layerKey)) return
      if (layerKey === ForestKey.Agreement) return
      dispatch(LayersActions.setProperty({ key: 'selected', layerKey, value: false }))
    })

    return params
  }
)
