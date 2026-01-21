import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { useAppSelector } from 'client/store/hooks'
import { LinksSelectors } from 'client/store/links/selectors'
import { getLinksVerificationKey } from 'client/store/links/state'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso?: CountryIso
): boolean | undefined => {
  const isVerificationInProgress = useAppSelector(LinksSelectors.isVerificationInProgress)
  const countryKey = getLinksVerificationKey(countryIso)
  return isVerificationInProgress?.[assessmentName]?.[cycleName]?.[countryKey]
}
