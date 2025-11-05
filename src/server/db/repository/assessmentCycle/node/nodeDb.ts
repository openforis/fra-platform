import { CountryIso } from 'meta/area/countryIso'
import { NodeValue } from 'meta/assessment/node'

export type NodeDb = {
  country_iso: CountryIso
  row_uuid: string
  col_uuid: string
  value: NodeValue
}
