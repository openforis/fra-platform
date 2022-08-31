export interface NodeValueValidationMessage {
  key: string
  params?: Record<string, never>
}

export interface NodeValueValidation {
  valid: boolean
  messages?: Array<NodeValueValidationMessage>
}
