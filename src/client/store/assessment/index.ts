import { useAppSelector } from 'client/store/hooks'

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)

export {
  useAssessment,
  useAssessmentDefault,
  useAssessments,
  useCycle,
  useLastPublishedCycle,
} from './hooks/useAssessmentAndCycle'
export { AssessmentActions } from './slice'
