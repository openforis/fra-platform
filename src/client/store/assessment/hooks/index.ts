import { useAppSelector } from 'client/store'
import { AssessmentSelectors } from 'client/store/assessment/selectors'

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)
export const useSettings = () => useAppSelector(AssessmentSelectors.getSettings)
