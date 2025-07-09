import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { User, Users } from 'meta/user'

import { useUser } from 'client/store/user/hooks/user'
import { useCountryUserRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  targetUser: User
}

export type EditUserRules = {
  emailDisabled: boolean // only admin can edit email
  permissionsAvailable: boolean // admin/nc/anc edits a collaborator in country page
  roleNameAvailable: boolean // admin edits a user in country page
  rolePropsAvailable: boolean // nc/anc/c role props (address, etc..) -> themselves or admin edits them in country page
  rolesAvailable: boolean // admin edits a user in admin page
}

export const useEditUserRules = (props: Props): EditUserRules => {
  const { targetUser } = props
  const user = useUser()
  const { countryIso } = useCountryUserRouteParams()

  const administrator = Users.isAdministrator(user)
  const countryPage = Areas.isISOCountry(countryIso)
  const editingSelf = user.id === targetUser?.id

  return useMemo<EditUserRules>(() => {
    const rules: EditUserRules = {
      emailDisabled: true,
      permissionsAvailable: false,
      roleNameAvailable: false,
      rolePropsAvailable: false,
      rolesAvailable: false,
    }

    // still loading targetUser
    if (Objects.isNil(targetUser)) return rules

    if (administrator) rules.emailDisabled = false

    if ((administrator || editingSelf) && countryPage) rules.rolePropsAvailable = true

    return rules
  }, [administrator, countryPage, editingSelf, targetUser])
}
