import { NodeValuesEstimation } from 'meta/assessment'

import { useAppSelector } from 'client/store'

export const useNodeValuesEstimation = (props: { estimationUuid: string }): NodeValuesEstimation | undefined =>
  useAppSelector((state) => state.data.nodeValuesEstimations?.[props.estimationUuid])
