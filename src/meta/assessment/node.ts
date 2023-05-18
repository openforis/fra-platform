import { CountryIso } from '@meta/area'
import { NodeValueValidation } from '@meta/assessment/nodeValueValidation'

export interface NodeValue {
  raw: any
  estimated?: boolean
  calculated?: boolean
  odp?: boolean
  odpId?: string
  validation?: NodeValueValidation
  taxonCode?: string
}

export interface Node {
  colUuid: string
  countryIso: CountryIso
  rowUuid: string
  value: NodeValue
  uuid: string
}
