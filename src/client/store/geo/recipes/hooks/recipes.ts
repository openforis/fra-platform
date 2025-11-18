import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { GeoRecipesSelectors } from 'client/store/geo/recipes/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useGeoSectionRecipe = (sectionKey: LayerSectionKey): string | undefined =>
  useAppSelector((state) => GeoRecipesSelectors.getSectionRecipe(state, sectionKey))
