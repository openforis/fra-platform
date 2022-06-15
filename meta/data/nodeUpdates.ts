import { CountryIso } from '@meta/area'
import { Assessment, Cycle, NodeValue } from '@meta/assessment'

export type NodeUpdates = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  values: Array<{
    tableName: string
    variableName: string
    colName: string
    value: NodeValue
  }>
}
