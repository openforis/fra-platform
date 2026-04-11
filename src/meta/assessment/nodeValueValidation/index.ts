import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

export type NodeValueValidationMessageParam = string | number | Array<string> | Array<number>

export interface NodeValueValidationMessage {
  name: ValidatorName
  key: string
  params?: Record<string, NodeValueValidationMessageParam>
}

export interface NodeValueValidation {
  valid: boolean
  messages?: Array<NodeValueValidationMessage>
}
