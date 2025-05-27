import { useCallback } from 'react'

import { RoleName, User, Users } from 'meta/user'

import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = (_: string, role: RoleName) => void

export const useOnChange = (user: User): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const cycle = useCycle()

  return useCallback<Returned>(
    (_: string, role: RoleName) => {
      const currentRole = Users.getRole(user, countryIso, cycle)

      const roles = user.roles.map((userRole) => {
        if (userRole.id === currentRole?.id) {
          return { ...userRole, role }
        }
        return userRole
      })

      const params = { assessmentName, cycleName, roles, userUuid: user.uuid }
      dispatch(UserManagementActions.updateUserRoles(params))
    },
    [assessmentName, countryIso, cycle, cycleName, dispatch, user]
  )
}
