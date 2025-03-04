import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, TableName, VariableName } from 'meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { getTableData } from './getTableData'

export const isVariableDataEmpty = (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
  variableName: VariableName
}): boolean => {
  const { assessmentName, cycleName, data, tableName, countryIso, variableName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, tableName, countryIso })

  if (Objects.isEmpty(tableData)) {
    return true
  }

  const recordRowData = Object.values(tableData)
  return Objects.isEmpty(recordRowData.filter((rowData) => rowData[variableName]))
}
