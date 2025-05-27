import { useAppSelector } from 'client/store/hooks'
import { AssessmentSectionSlice } from 'client/store/ui/assessmentSection/slice'

export const useIsEstimationPending = (): boolean =>
  useAppSelector((state) => state.ui[AssessmentSectionSlice.name].estimationPending)
