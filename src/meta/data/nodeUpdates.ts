import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'

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
