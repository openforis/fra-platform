import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'

import { TableValidationTestCase } from '../types'

type Props = Pick<TableValidationTestCase, 'data'> & {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const buildAssessmentData = (props: Props): RecordAssessmentData => {
  const { assessment, countryIso, cycle, data } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  return data.reduce<RecordAssessmentData>((acc, node) => {
    const { colName, tableName, value, variableName } = node
    const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
    Objects.setInPath({ obj: acc, path, value })
    return acc
  }, {})
}
