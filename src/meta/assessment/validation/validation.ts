export type ValidationMessageParam = string | number | Array<string> | Array<number>

export interface ValidationMessage {
  name?: string
  key: string
  params?: Record<string, ValidationMessageParam>
}

export interface Validation {
  valid: boolean
  messages?: Array<ValidationMessage>
}
