export type NodeValueValidationMessageParam = string | number | Array<string> | Array<number>

export interface NodeValueValidationMessage {
  validatorName: string
  key: string
  params?: Record<string, NodeValueValidationMessageParam>
}

export interface NodeValueValidation {
  valid: boolean
  messages?: Array<NodeValueValidationMessage>
}
