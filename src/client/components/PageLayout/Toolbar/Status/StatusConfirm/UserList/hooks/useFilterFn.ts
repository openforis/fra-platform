import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CountryUserSummary, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  status: StatusTransition
}

type Returned = (userSummary: CountryUserSummary) => boolean

export const useFilterFn = (props: Props): Returned => {
  const { status } = props
  const user = useUser()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    (datum: CountryUserSummary) => {
      if (datum.uuid === user.uuid) return false

      const recipientRoles = UserRoles.getRecipientRoles(status)
      const role = Users.getRole(datum, countryIso, cycle)

      return recipientRoles.includes(role?.role)
    },
    [countryIso, cycle, status, user.uuid]
  )
}
