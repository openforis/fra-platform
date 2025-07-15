import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { RoleName, UserRole, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FormDefinition, FormFieldType } from 'client/components/Form/types'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'

export const useRolesFields = (props: PropsFormDefinition): FormDefinition['fields'] => {
  const { targetUser } = props

  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const user = useUser()

  const isAdminPage = Areas.isGlobal(countryIso)
  const isAdmin = Users.isAdministrator(user)
  const userRoles = useMemo<Array<UserRole>>(
    () => Users.getCycleRoles({ cycle, user: targetUser }),
    [cycle, targetUser]
  )

  return useMemo<FormDefinition['fields']>(() => {
    if (Objects.isNil(targetUser)) return []

    const shouldShowRoles = (): boolean => {
      return isAdminPage && isAdmin
    }

    const fields = [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ].map((roleName) => {
      return {
        name: `roles.${roleName}`,
        label: `user.roles.${roleName}`,
        type: FormFieldType.country,
        isMulti: true,
        shouldShow: shouldShowRoles,
        defaultValue: userRoles.filter((role) => role.role === roleName).map((role) => role.countryIso),
      }
    })

    // TODO: Add admin checkbox
    return fields
  }, [isAdmin, isAdminPage, targetUser, userRoles])
}
