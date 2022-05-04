import { CountryIso } from '@meta/area'
import { AssessmentName, NodeValue } from '@meta/assessment'

export type NodesPatchBodyValue = {
  variableName: string
  colName: string
  value: NodeValue
}

export type NodesPatchBody = {
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
  countryIso: CountryIso
  tableName: string
  values: Array<NodesPatchBodyValue>
}
