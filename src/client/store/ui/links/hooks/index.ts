import { AssessmentName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { useAppSelector } from 'client/store/store'
import { LinksSelectors } from 'client/store/ui/links/selectors'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName
): boolean | undefined => {
  const isVerificationInProgress = useAppSelector(LinksSelectors.isVerificationInProgress)
  return isVerificationInProgress?.[assessmentName]?.[cycleName]
}
