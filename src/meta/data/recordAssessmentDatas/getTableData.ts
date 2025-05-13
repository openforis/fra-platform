import { RecordColumnData } from '../RecordAssessmentData'
import { getCountryData } from './getCountryData'
import { Props } from './props'

export const getTableData = (
  props: Pick<Props, 'assessmentName' | 'cycleName' | 'countryIso' | 'tableName' | 'data'>
): RecordColumnData => {
  const { assessmentName, countryIso, cycleName, data, tableName } = props

  return getCountryData({ assessmentName, cycleName, countryIso, data })[tableName] ?? {}
}
