import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentData } from 'meta/data/recordData'

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
  const { assessmentName, countryIso, cycleName, data, tableName, variableName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, tableName, countryIso })

  if (Objects.isEmpty(tableData)) {
    return true
  }

  const rowData = Object.values(tableData)
  return !rowData.some((rowData) => !Objects.isEmpty(rowData[variableName]?.raw))
}
