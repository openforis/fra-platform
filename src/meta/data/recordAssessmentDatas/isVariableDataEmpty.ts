import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, TableName, VariableName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { getTableData } from './getTableData'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
  variableName: VariableName
}

export const isVariableDataEmpty = (props: Props): boolean => {
  const { assessmentName, cycleName, data, tableName, countryIso, variableName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, tableName, countryIso })

  if (Objects.isEmpty(tableData)) {
    return true
  }

  const rowData = Object.values(tableData)
  return !rowData.some((rowData) => !Objects.isEmpty(rowData[variableName]?.raw))
}
