export interface NodeValueValidationMessage {
  key: string
  params?: Record<string, unknown>
}

export interface NodeValueValidation {
  valid: boolean
  messages?: Array<NodeValueValidationMessage>
}
