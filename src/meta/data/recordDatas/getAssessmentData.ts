import { RecordCycleData } from 'meta/data/recordData'

import { Props } from './props'

export const getAssessmentData = (props: Pick<Props, 'assessmentName' | 'data'>): RecordCycleData => {
  return props.data?.[props.assessmentName] ?? {}
}
