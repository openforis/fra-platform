import { CountryIso } from 'meta/area'
import { NodeValueValidations } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { getTableData } from 'meta/data/recordAssessmentDatas/getTableData'

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
