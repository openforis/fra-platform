import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
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
    const roleNames = Users.getRolesAllowedToEdit({ user, countryIso, cycle })

    return roleNames.map<Option>((roleName) => {
      return { label: t(Users.getI18nRoleLabelKey(roleName)), value: roleName }
    }, [])
  }, [countryIso, cycle, t, user])
}
