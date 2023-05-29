import { getAssessmentData } from './getAssessmentData'
import { Props } from './props'

export const getCycleData = (props: Pick<Props, 'assessmentName' | 'cycleName' | 'data'>) => {
  return getAssessmentData(props)?.[props.cycleName] ?? {}
}
