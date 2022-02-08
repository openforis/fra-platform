import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

export type SectionDataState = {
  tableData: Record<string, Record<CountryIso, Record<string, NodeValue>>>
}
