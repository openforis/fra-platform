import { CountryIso } from '@meta/area'

export interface NodeValue {
  raw: string | null
  estimated?: boolean
  calculated?: boolean
  odp?: boolean
}

export interface Node {
  colUuid: string
  countryIso: CountryIso
  rowUuid: string
  value: NodeValue
  uuid: string
}
