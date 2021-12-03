import { useAppSelector } from '@client/store'
import { AssessmentName } from '@core/meta/assessment'

export const useAssessmentPropsName = (): AssessmentName =>
  useAppSelector((state) => state.assessment?.assessment?.props.name)
