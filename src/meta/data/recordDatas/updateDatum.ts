import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment/node'
import { RecordAssessmentData } from 'meta/data/recordData'

import { Props } from './props'

export const updateDatum = (
  props: Props & {
    value: NodeValue
  }
): RecordAssessmentData => {
  const { assessmentName, colName, countryIso, cycleName, data, tableName, value, variableName } = props

  const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
  Objects.setInPath({ obj: data, path, value })

  return data
}
