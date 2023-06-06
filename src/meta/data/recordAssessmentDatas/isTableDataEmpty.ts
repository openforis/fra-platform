import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, TableName } from 'meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { getTableData } from './getTableData'

export const isTableDataEmpty = (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
}): boolean => {
  const { assessmentName, cycleName, data, tableName, countryIso } = props
  const tableData = getTableData({ assessmentName, cycleName, data, tableName, countryIso })
  if (Objects.isEmpty(tableData)) {
    return true
  }

  return !Object.values(tableData)
    .flatMap(
      (rows) => Object.values(rows).filter((nodeValue) => !nodeValue.calculated && nodeValue.raw !== null).length
    )
    .every(Boolean)
}
