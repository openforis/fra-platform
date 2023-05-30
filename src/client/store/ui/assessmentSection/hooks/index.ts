import { useAppSelector } from '@client/store'

export { useIsEstimationPending } from './useIsEstimatePending'

export const useShowOriginalDatapoints = () =>
  useAppSelector((state) => state.ui.assessmentSection.showOriginalDataPoint)
