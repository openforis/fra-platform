import { CountryIso } from 'meta/area'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'

export interface NodeValue {
  calculated?: boolean
  /**
   * @deprecated
   */
  estimated?: boolean
  estimationUuid?: string
  faoEstimate?: boolean
  /**
   * @deprecated Use odpId instead.
   */
  odp?: boolean
  odpId?: number
  raw: any // TODO: do not use any
  taxonCode?: string
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
