import { useAppSelector } from '@client/store'

export const useIsEstimationPending = (): boolean =>
  useAppSelector((state) => state.pages.assessmentSection.estimationPending)
