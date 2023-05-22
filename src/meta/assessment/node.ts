import { CountryIso } from '@meta/area'
import { NodeValueValidation } from '@meta/assessment/nodeValueValidation'

export interface NodeValue {
  raw: any
  estimated?: boolean
  calculated?: boolean
  /**
   * @deprecated Use odpId instead.
   */
  odp?: boolean
  odpId?: number
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
