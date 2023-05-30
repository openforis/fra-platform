import { RecordTableData } from '../RecordAssessmentData'
import { getCycleData } from './getCycleData'
import { Props } from './props'

export const getCountryData = (
  props: Pick<Props, 'assessmentName' | 'cycleName' | 'countryIso' | 'data'>
): RecordTableData => {
  return getCycleData(props)[props.countryIso] ?? {}
}
