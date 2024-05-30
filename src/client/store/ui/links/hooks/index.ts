import { AssessmentName, CycleName } from 'meta/assessment'

import { useAppSelector } from 'client/store/store'
import { LinksSelectors } from 'client/store/ui/links/selectors'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName
): boolean | undefined => {
  const isVerificationInProgress = useAppSelector(LinksSelectors.isVerificationInProgress)
  return isVerificationInProgress?.[assessmentName]?.[cycleName]
}
