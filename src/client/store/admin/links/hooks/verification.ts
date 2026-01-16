import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { LinksSelectors } from 'client/store/admin/links/selectors'
import { getLinksVerificationKey } from 'client/store/admin/links/state'
import { useAppSelector } from 'client/store/hooks'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso?: CountryIso
): boolean | undefined => {
  const isVerificationInProgress = useAppSelector(LinksSelectors.isVerificationInProgress)
  const countryKey = getLinksVerificationKey(countryIso)
  return isVerificationInProgress?.[assessmentName]?.[cycleName]?.[countryKey]
}
