import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option>

export const useOptions = (): Returned => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const user = useUser()

  return useMemo<Returned>(() => {
    const roles = Users.isAdministrator(user)
      ? Object.keys(RoleName)
      : Users.getRolesAllowedToEdit({ user, countryIso, cycle })

    const options = roles.reduce<Returned>((acc, key) => {
      if (key !== RoleName.ADMINISTRATOR) {
        acc.push({
          label: t(Users.getI18nRoleLabelKey(key)),
          value: key,
        })
      }
      return acc
    }, [])

    return options
  }, [countryIso, cycle, t, user])
}
