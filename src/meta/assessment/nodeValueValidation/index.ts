import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

export interface NodeValueValidationMessage extends ValidationMessage {
  name: ValidatorName
}

export interface NodeValueValidation extends Validation {
  messages?: Array<NodeValueValidationMessage>
}
