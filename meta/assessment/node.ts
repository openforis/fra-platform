import { CountryIso } from '@meta/area'
import { NodeValueValidation } from '@meta/assessment/nodeValueValidation'

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
