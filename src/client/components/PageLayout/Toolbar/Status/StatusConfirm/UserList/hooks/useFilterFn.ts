import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummary } from 'meta/user/countrySummary'
import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  status: StatusTransition
}

type Returned = (userSummary: UserCountrySummary) => boolean

export const useFilterFn = (props: Props): Returned => {
  const { status } = props
  const user = useUser()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    (datum: UserCountrySummary) => {
      if (datum.uuid === user.uuid) return false

      const recipientRoles = UserRoles.getRecipientRoles(status)
      const role = Users.getRole(datum, countryIso, cycle)

      return recipientRoles.includes(role?.role)
    },
    [countryIso, cycle, status, user.uuid]
  )
}
