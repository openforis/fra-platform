import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { RoleName, UserRole, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'

type Returned = FormDefinition['fields']

export const useRolesFields = (props: PropsFormDefinition): Returned => {
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

  return useMemo<Returned>(() => {
    if (Objects.isNil(targetUser)) return []

    const shouldShowRoles = (): boolean => {
      return isAdminPage && isAdmin
    }

    const triggerFields = ['roles']
    const fields = [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ].map<FieldDefinition<UserEditCountryForm>>((roleName) => {
      return {
        name: `roles.${roleName}`,
        label: `user.roles.${roleName}`,
        type: FormFieldType.country,
        isMulti: true,
        shouldShow: shouldShowRoles,
        defaultValue: userRoles.filter((role) => role.role === roleName).map((role) => role.countryIso),
        watches: {
          getDisabledOptions: (props) => {
            const { values } = props
            return Object.entries(values.roles).reduce<Array<string>>((acc, [key, value]) => {
              if ([RoleName.ADMINISTRATOR, roleName].includes(key as RoleName)) return acc
              return [...acc, ...(value as Array<string>)]
            }, [])
          },
          isDisabled: (props) => {
            const { values } = props
            return values.roles?.[RoleName.ADMINISTRATOR] === true
          },
          triggerFields,
        },
      }
    })

    fields.push({
      errorField: `roles`,
      name: `roles.${RoleName.ADMINISTRATOR}`,
      label: `user.roles.${RoleName.ADMINISTRATOR}`,
      type: FormFieldType.checkbox,
      shouldShow: shouldShowRoles,
      defaultValue: isAdmin,
      watches: {
        triggerFields,
      },
    })

    return fields
  }, [isAdmin, isAdminPage, targetUser, userRoles])
}
