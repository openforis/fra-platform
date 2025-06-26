import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { LinksSelectors } from 'client/store/admin/links/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName
): boolean | undefined => {
  const isVerificationInProgress = useAppSelector(LinksSelectors.isVerificationInProgress)
  return isVerificationInProgress?.[assessmentName]?.[cycleName]
}
