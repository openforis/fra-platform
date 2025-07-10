import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
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
  const { countryIso } = useCountryUserRouteParams<CountryIso>()
  const cycle = useCycle()

  const isAdministrator = Users.isAdministrator(user)
  const isCollaborator = Users.isCollaborator(user, countryIso, cycle)
  const isNationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
  const isAlternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
  const isCountryPage = Areas.isISOCountry(countryIso)
  const isSelf = user.id === targetUser?.id

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

    if (isAdministrator) rules.emailDisabled = false

    const rolePropsRoles =
      isAdministrator && isAlternateNationalCorrespondent && isCollaborator && isNationalCorrespondent
    if ((rolePropsRoles || isSelf) && isCountryPage) rules.rolePropsAvailable = true

    return rules
  }, [
    isAdministrator,
    isAlternateNationalCorrespondent,
    isCollaborator,
    isCountryPage,
    isNationalCorrespondent,
    isSelf,
    targetUser,
  ])
}
