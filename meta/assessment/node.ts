import { CountryIso } from '@meta/area'

export interface NodeValueValidationMessage {
  key: string
  params?: Record<string, never>
}

export interface NodeValueValidation {
  valid: boolean
  messages?: Array<NodeValueValidationMessage>
}

export interface NodeValue {
  raw: string | null
  estimated?: boolean
  calculated?: boolean
  odp?: boolean
  validation?: NodeValueValidation
}

export interface Node {
  colUuid: string
  countryIso: CountryIso
  rowUuid: string
  value: NodeValue
  uuid: string
}
