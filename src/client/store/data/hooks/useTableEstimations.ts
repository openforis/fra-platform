import { NodeValuesEstimation } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export const useTableEstimations = (): Record<string, NodeValuesEstimation> =>
  useAppSelector((state) => state.data.tableEstimations)
