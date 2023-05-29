import { Props } from './props'

export const getAssessmentData = (props: Pick<Props, 'assessmentName' | 'data'>) => {
  return props.data?.[props.assessmentName] ?? {}
}
