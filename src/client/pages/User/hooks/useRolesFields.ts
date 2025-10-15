import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { RoleName, UserRole, Users, UserStatus } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { FieldDefinition, FormDefinition, FormFieldType, WatchCallback } from 'client/components/Form/types'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'

type Returned = FormDefinition['fields']

const rolesWithCountries = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

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

    const triggerFields = ['roles']

    const shouldShow = (): boolean => {
      return isAdminPage && isAdmin
    }
    const isSelfWatch: WatchCallback<UserEditCountryForm, boolean> = (_props) => {
      return String(targetUser.id) === String(user.id)
    }

    const isTargetDisabledWatch: WatchCallback<UserEditCountryForm, boolean> = ({ values }) => {
      return values.user.disabled
    }

    const fields = rolesWithCountries.map<FieldDefinition<UserEditCountryForm>>((roleName) => {
      const isAdminWatch: WatchCallback<UserEditCountryForm, boolean> = (props) => {
        const { values } = props
        return values.roles?.[RoleName.ADMINISTRATOR] === true
      }
      return {
        name: `roles.${roleName}`,
        label: `user.roles.${roleName}`,
        type: FormFieldType.country,
        isMulti: true,
        shouldShow,
        defaultValue: userRoles.filter((role) => role.role === roleName).map((role) => role.countryIso),
        watches: {
          clearIf: (props) => {
            const { values } = props
            return {
              shouldClear: values.roles?.[RoleName.ADMINISTRATOR] === true,
              clearValue: [],
            }
          },
          getDisabledOptions: (props) => {
            const { values } = props
            return Object.entries(values.roles).reduce<Array<string>>((acc, [key, value]) => {
              if ([RoleName.ADMINISTRATOR, roleName].includes(key as RoleName) || !value) return acc
              return [...acc, ...(value as Array<string>)]
            }, [])
          },
          isDisabled: (values) => isAdminWatch(values) || isTargetDisabledWatch(values),
          triggerFields,
        },
      }
    })

    fields.push({
      errorField: `roles`,
      name: `roles.${RoleName.ADMINISTRATOR}`,
      label: `user.roles.${RoleName.ADMINISTRATOR}`,
      type: FormFieldType.checkbox,
      shouldShow,
      defaultValue: Users.isAdministrator(targetUser),
      watches: {
        isDisabled: (values) => isSelfWatch(values) || isTargetDisabledWatch(values),
        triggerFields,
      },
    })

    fields.push({
      name: `user.disabled`,
      label: `editUser.disabled`,
      type: FormFieldType.checkbox,
      shouldShow,
      defaultValue: targetUser.status === UserStatus.disabled,
      watches: {
        isDisabled: isSelfWatch,
      },
    })

    return fields
  }, [isAdmin, isAdminPage, targetUser, user.id, userRoles])
}
