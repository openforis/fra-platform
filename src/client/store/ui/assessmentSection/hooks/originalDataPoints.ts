import { useAppSelector } from 'client/store/hooks'
import { AssessmentSectionSelectors } from 'client/store/ui/assessmentSection/selectors'

export const useShowOriginalDatapoints = (): boolean => useAppSelector(AssessmentSectionSelectors.showOriginalDataPoint)
