import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, NodeValue } from 'meta/assessment'

export type NodeUpdate = {
  tableName: string
  variableName: string
  colName: string
  value: NodeValue
}

export type NodeUpdates = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  nodes: Array<NodeUpdate>
}
