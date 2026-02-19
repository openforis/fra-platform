import { useMemo } from 'react'

import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { CountryStatuses } from 'meta/area/countryStatuses'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  country: Country
  cycle: Cycle
  hasRouteParams: boolean
  status: StatusTransition
  user: User
}

type Returned = boolean

export const useNeedsGuardCheck = (props: Props): Returned => {
  const { country, cycle, hasRouteParams, status, user } = props

  return useMemo<Returned>(() => {
    const isTransitionToApproval = status.status === CountryStatus.approval && status.direction === 'next'
    const canSendToApproval =
      CountryStatuses.getAllowedTransition({ country, cycle, user }).next === CountryStatus.approval

    return hasRouteParams && canSendToApproval && isTransitionToApproval
  }, [country, cycle, hasRouteParams, status.direction, status.status, user])
}
