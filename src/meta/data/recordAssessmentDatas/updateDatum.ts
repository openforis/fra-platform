import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { Props } from './props'

export const updateDatum = (
  props: Props & {
    value: NodeValue
  }
): RecordAssessmentData => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName, value } = props

  const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
  Objects.setInPath({ obj: data, path, value })

  return data
}
