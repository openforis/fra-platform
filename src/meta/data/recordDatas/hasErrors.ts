import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { getTableData } from 'meta/data/recordDatas/getTableData'

export const hasErrors = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableName: TableName
  data: RecordAssessmentData
}): boolean => {
  const { assessmentName, countryIso, cycleName, data, tableName } = props
  const tableData = getTableData({ assessmentName, cycleName, countryIso, tableName, data })
  return Object.values(tableData).some((values) => {
    return Object.values(values).some((value) => !NodeValueValidations.isValid(value))
  })
}
