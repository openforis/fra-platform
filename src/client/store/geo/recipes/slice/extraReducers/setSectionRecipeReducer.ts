import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setSectionRecipe } from 'client/store/geo/recipes/actions/setSectionRecipe'
import { GeoRecipesState } from 'client/store/geo/recipes/state'

export const setSectionRecipeReducer = (builder: ActionReducerMapBuilder<GeoRecipesState>) => {
  builder.addCase(setSectionRecipe.fulfilled, (state, action) => {
    const { recipeName, sectionKey } = action.payload
    state[sectionKey] = recipeName
  })
}
