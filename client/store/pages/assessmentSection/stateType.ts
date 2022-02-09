import { CountryIso } from '@meta/area'
import { NodeValue, Table } from '@meta/assessment'

export type AssessmentSectionState = {
  data?: Record<string, Record<CountryIso, Record<string, NodeValue>>>
  metaData?: Array<Table>
}
