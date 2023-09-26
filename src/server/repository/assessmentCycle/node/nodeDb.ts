import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'

export type NodeDb = {
  country_iso: CountryIso
  row_uuid: string
  col_uuid: string
  value: NodeValue
}
