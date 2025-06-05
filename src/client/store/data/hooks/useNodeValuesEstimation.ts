import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

import { useAppSelector } from 'client/store/hooks'

export const useNodeValuesEstimation = (props: { estimationUuid: string }): NodeValuesEstimation | undefined =>
  useAppSelector((state) => state.dataDep.nodeValuesEstimations?.[props.estimationUuid])
