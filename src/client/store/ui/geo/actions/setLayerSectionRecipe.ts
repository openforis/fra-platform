import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { LayerSectionKey } from 'meta/geo'
import { LayerKey, LayerSource, Recipe } from 'meta/geo/layer'

import { RootState } from 'client/store/RootState'
import { GeoActions } from 'client/store/ui/geo/slice'

type Params = {
  countryIso: CountryIso
  recipe: Recipe
  recipeName: string
  sectionKey: LayerSectionKey
}

export const setLayerSectionRecipe = createAsyncThunk<void, Params>(
  'geo/setLayerSectionRecipe',
  async ({ countryIso, recipe, recipeName, sectionKey }, { dispatch, getState }) => {
    dispatch(GeoActions.setLayerSectionRecipeName({ recipe: recipeName, sectionKey }))

    const state = getState()
    const sectionState = (state as RootState).geo.sections?.[sectionKey]
    const recipeLayersSet = new Set()

    // Select all layers that are part of the recipe
    recipe.layers.forEach((layer) => {
      const layerState = sectionState?.[layer.key]
      if (!layerState?.selected)
        dispatch(GeoActions.setLayerSelected({ layerKey: layer.key, sectionKey, selected: true }))
      if (layer.options !== undefined) {
        dispatch(GeoActions.setLayerOptions({ layerKey: layer.key, options: layer.options, sectionKey }))
      }
      dispatch(GeoActions.setLayerOpacityValue({ layerKey: layer.key, opacity: 0, sectionKey }))

      recipeLayersSet.add(layer.key)
    })

    const agreementLayerKey = 'Agreement' as LayerKey
    const agreementLayerState = sectionState?.Agreement?.options?.agreementLayer
    const agreementLayerSource: LayerSource = {
      key: agreementLayerKey,
      options: {
        agreement: {
          layers: recipe.layers,
          gteAgreementLevel: agreementLayerState?.level ?? 1,
        },
      },
    }

    dispatch(GeoActions.setLayerSelected({ layerKey: agreementLayerKey, sectionKey, selected: true }))

    if (agreementLayerState?.level === undefined)
      dispatch(GeoActions.setAgreementLevel({ layerKey: agreementLayerKey, level: 1, sectionKey }))

    dispatch(
      GeoActions.postLayer({
        countryIso,
        sectionKey,
        layerKey: agreementLayerKey,
        layerSource: agreementLayerSource,
      })
    )

    // Unselect all layers that are not part of the recipe
    Object.entries(sectionState ?? {}).forEach(([key]) => {
      const layerKey = key as LayerKey
      if (layerKey === ('Agreement' as LayerKey)) return
      if (recipeLayersSet.has(layerKey)) return
      dispatch(GeoActions.setLayerSelected({ layerKey, sectionKey, selected: false }))
    })
  }
)
