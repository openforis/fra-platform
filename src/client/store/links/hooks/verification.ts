import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import { useAppSelector } from 'client/store/hooks'
import { LinksSelectors } from 'client/store/links/selectors'
import { getLinksVerificationKey, LinksVerificationSummaryStatus } from 'client/store/links/state'

export const useIsVerificationInProgress = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso?: CountryIso
): boolean | undefined => {
  const countryKey = getLinksVerificationKey(countryIso)
  return useAppSelector((state) =>
    LinksSelectors.getIsVerificationInProgress(state, assessmentName, cycleName, countryKey)
  )
}

export const useVerificationSummary = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso?: CountryIso
): LinksVerificationSummary | undefined => {
  const countryKey = getLinksVerificationKey(countryIso)
  return useAppSelector((state) => LinksSelectors.getVerificationSummary(state, assessmentName, cycleName, countryKey))
}

export const useVerificationSummaryStatus = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso?: CountryIso
): LinksVerificationSummaryStatus | undefined => {
  const countryKey = getLinksVerificationKey(countryIso)
  return useAppSelector((state) =>
    LinksSelectors.getVerificationSummaryStatus(state, assessmentName, cycleName, countryKey)
  )
}
