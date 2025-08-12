import { createAction } from '@reduxjs/toolkit'

import { LayerSectionKey } from 'meta/geo'

type Params = {
  recipeName: string
  sectionKey: LayerSectionKey
}

export const setSectionRecipe = createAction<Params>('geo/recipes/setSectionRecipe')
