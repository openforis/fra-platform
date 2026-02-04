import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  countryIso: CountryIso
  cycle: Cycle
  hasRouteParams: boolean
  status: StatusTransition
  user: User
}

type Returned = boolean

export const useNeedsGuardCheck = (props: Props): Returned => {
  const { countryIso, cycle, hasRouteParams, status, user } = props

  return useMemo<Returned>(() => {
    const isTransitionToApproval = status.status === CountryStatus.approval && status.direction === 'next'
    const isAdmin = Users.isAdministrator(user)
    const canSendToApproval =
      Users.isRegionalFocalPoint(user, countryIso, cycle) || Users.isReviewer(user, countryIso, cycle)

    return hasRouteParams && canSendToApproval && isTransitionToApproval && !isAdmin
  }, [countryIso, cycle, hasRouteParams, status.direction, status.status, user])
}
