import { CountryIso } from 'meta/area/countryIso'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'

export interface NodeValue {
  calculated?: boolean
  estimationUuid?: string
  faoEstimate?: boolean
  imported?: boolean
  odpId?: number
  raw: any // TODO: do not use any
  taxonCode?: string

  // === Deprecated
  /**
   * @deprecated
   */
  estimated?: boolean
  /**
   * @deprecated Use odpId instead.
   */
  odp?: boolean
  /**
   * @deprecated
   */
  validation?: NodeValueValidation
}

export interface Node {
  colUuid: string
  countryIso: CountryIso
  rowUuid: string
  value: NodeValue
  uuid: string
}
