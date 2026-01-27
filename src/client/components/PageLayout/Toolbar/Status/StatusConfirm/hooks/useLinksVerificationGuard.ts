import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'

import { Areas } from 'meta/area/areas'
import { CountryStatus } from 'meta/area/countryStatus'
import {
  checkLinksVerificationGuard,
  LinksVerificationGuardResult,
} from 'meta/area/countryStatuses/linksVerificationGuard'
import { AssessmentName } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'
import { Users } from 'meta/user/users'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAppDispatch, useInjectSlice } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { useVerificationSummary, useVerificationSummaryStatus } from 'client/store/links/hooks/verification'
import { LinksSlice } from 'client/store/links/slice'
import { LinksSliceName } from 'client/store/links/slice/name'
import { LinksVerificationSummaryStatus } from 'client/store/links/state'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks/country'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  status: StatusTransition
}

type Returned = {
  canSubmit: boolean
  guardResult: LinksVerificationGuardResult
  hasGuardFetchError: boolean
  isBlocked: boolean
  isLoading: boolean
  linksStatusUrl: string
}

export const useLinksVerificationGuard = (props: Props): Returned => {
  const { status } = props

  const dispatch = useAppDispatch()
  const country = useAssessmentCountry()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  useInjectSlice({ reducer: LinksSlice.reducer, reducerPath: LinksSliceName })

  const currentStatus = Areas.getStatus(country)
  const isTransitionToApproval = status.status === CountryStatus.approval && status.direction === 'next'

  const isAdmin = Users.isAdministrator(user)
  const canSendToApproval =
    Users.isRegionalFocalPoint(user, countryIso, cycle) || Users.isReviewer(user, countryIso, cycle)

  const hasRouteParams = Boolean(assessmentName && countryIso && cycleName)
  const needsGuardCheck = hasRouteParams && canSendToApproval && isTransitionToApproval && !isAdmin

  useEffect(() => {
    if (!needsGuardCheck) return
    dispatch(LinksActions.getVerificationSummary({ assessmentName, countryIso, cycleName }))
  }, [assessmentName, countryIso, cycleName, dispatch, needsGuardCheck])

  const verificationSummary = useVerificationSummary(assessmentName, cycleName, countryIso)
  const verificationSummaryStatus = useVerificationSummaryStatus(assessmentName, cycleName, countryIso)

  const guardResult = useMemo<LinksVerificationGuardResult>(() => {
    if (!needsGuardCheck || !verificationSummary) return { blocked: false }
    return checkLinksVerificationGuard({
      country,
      currentStatus,
      targetStatus: status.status,
      verificationSummary,
    })
  }, [country, currentStatus, needsGuardCheck, status.status, verificationSummary])

  const linksStatusUrl = useMemo<string>(() => {
    if (!hasRouteParams) return ''
    return Routes.CountryHomeSection.generatePath({
      assessmentName,
      countryIso,
      cycleName,
      sectionName: SectionNames.Country.Home.linksStatus,
    })
  }, [assessmentName, countryIso, cycleName, hasRouteParams])

  const hasError = needsGuardCheck && verificationSummaryStatus === LinksVerificationSummaryStatus.failed
  const isLoading = needsGuardCheck && !verificationSummary && !hasError

  const canSubmit = !hasError && !guardResult.blocked && !isLoading
  const hasGuardFetchError = hasError && !isLoading
  const isBlocked = guardResult.blocked && !hasError && !isLoading

  return { canSubmit, guardResult, hasGuardFetchError, isBlocked, isLoading, linksStatusUrl }
}
