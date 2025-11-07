import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Authorizer, User, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryUserRouteParams } from 'client/hooks/routeParams'

type Props = {
  targetUser?: User
}

export type EditUserRules = {
  emailDisabled: boolean // only admin can edit email
  userDisabled: boolean // user can edit
  // permissionsAvailable: boolean // admin/nc/anc edits a collaborator in country page
  // roleNameAvailable: boolean // admin edits a user in country page
  // rolePropsAvailable: boolean // nc/anc/c role props (address, etc..) -> themselves or admin edits them in country page
  // rolesAvailable: boolean // admin edits a user in admin page
}

export const useEditUserRules = (props: Props): EditUserRules => {
  const { targetUser } = props

  const { countryIso } = useCountryUserRouteParams<CountryIso>()
  const cycle = useCycle()
  const user = useUser()

  const isAdministrator = Users.isAdministrator(user)

  return useMemo<EditUserRules>(() => {
    const rules: EditUserRules = {
      emailDisabled: true,
      userDisabled: true,
      // permissionsAvailable: false,
      // roleNameAvailable: false,
      // rolesAvailable: false,
    }

    // still loading targetUser
    if (Objects.isNil(targetUser)) return rules

    if (isAdministrator) rules.emailDisabled = false

    if (Authorizer.canEditUser({ cycle, countryIso, target: targetUser, user })) rules.userDisabled = false

    return rules
  }, [countryIso, cycle, isAdministrator, targetUser, user])
}
