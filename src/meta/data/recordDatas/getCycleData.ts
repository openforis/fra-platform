import { RecordCountryData } from 'meta/data/recordData'

import { getAssessmentData } from './getAssessmentData'
import { Props } from './props'

export const getCycleData = (props: Pick<Props, 'assessmentName' | 'cycleName' | 'data'>): RecordCountryData => {
  return getAssessmentData(props)[props.cycleName] ?? {}
}
