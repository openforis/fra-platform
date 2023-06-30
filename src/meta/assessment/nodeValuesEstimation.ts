import { VariableName } from 'meta/assessment/row'

export enum NodeValueEstimationMethod {
  annualChange = 'annualChange',
  linear = 'linear',
  repeatLast = 'repeatLast',
}

export type NodeValuesEstimationVariableOptions = {
  changeRates?: { rateFuture: number; ratePast: number }
}

export type NodeValuesEstimation = {
  createdAt: string
  method: NodeValueEstimationMethod
  uuid: string
  variables: Record<VariableName, NodeValuesEstimationVariableOptions>
  tableUuid: string
}
