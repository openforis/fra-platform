import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { LayerSectionKey } from '@meta/geo'
import { LayerKey, Recipe } from '@meta/geo/layer'

import { RootState } from '@client/store/RootState'
import { GeoActions } from '@client/store/ui/geo/slice'

export interface SetLayerSectionRecipeProps {
  countryIso: CountryIso
  sectionKey: LayerSectionKey
  recipe: Recipe
  recipeName: string
}

export const setLayerSectionRecipe = createAsyncThunk<void, SetLayerSectionRecipeProps>(
  'geo/setLayerSectionRecipe',
  async ({ countryIso, sectionKey, recipe, recipeName }, { getState, dispatch }) => {
    if (recipeName === 'custom') {
      dispatch(GeoActions.setLayerSectionRecipeName({ sectionKey, recipe: recipeName }))
      return
    }
    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const recipeLayersSet = new Set()

    // Select and fetch all layers that are part of the recipe
    recipe.layers.forEach((layer) => {
      const layerState = sectionState?.[layer.key]
      if (!layerState?.mapId)
        dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey: layer.key, layerSource: layer }))
      if (!layerState?.selected) dispatch(GeoActions.toggleLayer({ sectionKey, layerKey: layer.key }))
      if (layer.options !== undefined) {
        dispatch(GeoActions.setLayerOptions({ sectionKey, layerKey: layer.key, options: layer.options }))
      }
      recipeLayersSet.add(layer.key)
    })
    // Unselect all layers that are not part of the recipe
    Object.entries(sectionState).forEach(([key, layerState]) => {
      const layerKey = key as LayerKey
      if (recipeLayersSet.has(layerKey)) return
      if (layerState?.selected) dispatch(GeoActions.toggleLayer({ sectionKey, layerKey }))
    })
  }
)
