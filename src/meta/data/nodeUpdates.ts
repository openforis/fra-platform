import { CountryIso } from 'meta/area'
import { Assessment, Cycle, NodeValue } from 'meta/assessment'

export type NodeUpdate = {
  tableName: string
  variableName: string
  colName: string
  value: NodeValue
}

export type NodeUpdates = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  nodes: Array<NodeUpdate>
}
