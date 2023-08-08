import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { LayerSectionKey } from '@meta/geo'
import { LayerKey, LayerSource, Recipe } from '@meta/geo/layer'

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
    dispatch(GeoActions.setLayerSectionRecipeName({ sectionKey, recipe: recipeName }))
    if (recipeName === 'custom') return
    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const recipeLayersSet = new Set()
    const agreementLayerKey = 'Agreement' as LayerKey
    const agreementLayerSource: LayerSource = {
      key: agreementLayerKey,
      options: { agreement: { gteAgreementLevel: 1, layers: [] as Array<LayerSource> } },
    } as LayerSource

    // Select and fetch all layers that are part of the recipe
    recipe.layers.forEach((layer) => {
      const layerState = sectionState?.[layer.key]
      if (!layerState?.selected) dispatch(GeoActions.toggleLayer({ sectionKey, layerKey: layer.key }))
      if (layer.options !== undefined) {
        dispatch(GeoActions.setLayerOptions({ sectionKey, layerKey: layer.key, options: layer.options }))
      }
      agreementLayerSource.options.agreement.layers.push(layer)
      recipeLayersSet.add(layer.key)
    })
    dispatch(
      GeoActions.postLayer({
        countryIso,
        sectionKey,
        layerKey: agreementLayerKey,
        layerSource: agreementLayerSource,
      })
    )
    if (!sectionState?.[agreementLayerKey]?.selected) {
      dispatch(GeoActions.toggleLayer({ sectionKey, layerKey: agreementLayerKey }))
    }
    dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey: agreementLayerKey, level: 1 }))
    dispatch(GeoActions.setSectionGlobalOpacity({ sectionKey, opacity: 0 }))
    // Unselect all layers that are not part of the recipe
    Object.entries(sectionState).forEach(([key, layerState]) => {
      const layerKey = key as LayerKey
      if (layerKey === agreementLayerKey) return
      if (recipeLayersSet.has(layerKey)) return
      if (layerState?.selected) dispatch(GeoActions.toggleLayer({ sectionKey, layerKey }))
    })
  }
)
