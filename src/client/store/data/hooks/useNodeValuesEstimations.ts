import { NodeValuesEstimation } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export const useNodeValuesEstimations = (): Record<string, NodeValuesEstimation> =>
  useAppSelector((state) => state.data.nodeValuesEstimations)
