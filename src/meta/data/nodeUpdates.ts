import { CountryIso } from 'meta/area'
import { AssessmentName, NodeValue } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

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
