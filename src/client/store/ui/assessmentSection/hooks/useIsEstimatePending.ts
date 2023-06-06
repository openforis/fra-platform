import { useAppSelector } from 'client/store'

export const useIsEstimationPending = (): boolean => useAppSelector((state) => state.ui.assessmentSection.estimationPending)
