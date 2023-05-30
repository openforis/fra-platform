import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName, NodeValueValidations, TableName } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'
import { getTableData } from '@meta/data/recordAssessmentDatas/getTableData'

export const hasErrors = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableName: TableName
  data: RecordAssessmentData
}): boolean => {
  const { assessmentName, cycleName, countryIso, tableName, data } = props
  const tableData = getTableData({ assessmentName, cycleName, countryIso, tableName, data })
  return Object.values(tableData).some((values) => {
    return Object.values(values).some((value) => !NodeValueValidations.isValid(value))
  })
}
