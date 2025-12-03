import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordAssessmentData
  variableName: VariableName
}

const tableName = TableNames.climaticDomain

export const getClimaticValue = (props: Props): string | undefined => {
  const { assessmentName, countryIso, cycleName, data, variableName } = props

  const climaticDomain = RecordAssessmentDatas.getTableData({ assessmentName, countryIso, cycleName, data, tableName })
  const value = climaticDomain?.percentOfForestArea2015?.[variableName]?.raw
  const valueDefault = climaticDomain?.percentOfForestArea2015Default?.[variableName]?.raw

  return value ?? valueDefault
}
