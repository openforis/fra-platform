export type ValidationMessageParamKey = { key: string }

export type ValidationMessageParam =
  | string
  | number
  | ValidationMessageParamKey
  | Array<string>
  | Array<number>
  | Array<ValidationMessageParamKey>

export interface ValidationMessage {
  name?: string
  key: string
  params?: Record<string, ValidationMessageParam>
}

export interface Validation {
  valid: boolean
  messages?: Array<ValidationMessage>
}
