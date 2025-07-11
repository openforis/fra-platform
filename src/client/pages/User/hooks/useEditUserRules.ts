import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { User, Users } from 'meta/user'

import { useUser } from 'client/store/user/hooks/user'

type Props = {
  targetUser?: User
}

export type EditUserRules = {
  emailDisabled: boolean // only admin can edit email
  permissionsAvailable: boolean // admin/nc/anc edits a collaborator in country page
  roleNameAvailable: boolean // admin edits a user in country page
  // rolePropsAvailable: boolean // nc/anc/c role props (address, etc..) -> themselves or admin edits them in country page
  rolesAvailable: boolean // admin edits a user in admin page
}

export const useEditUserRules = (props: Props): EditUserRules => {
  const { targetUser } = props

  const user = useUser()

  const isAdministrator = Users.isAdministrator(user)

  return useMemo<EditUserRules>(() => {
    const rules: EditUserRules = {
      emailDisabled: true,
      permissionsAvailable: false,
      roleNameAvailable: false,
      rolesAvailable: false,
    }

    // still loading targetUser
    if (Objects.isNil(targetUser)) return rules

    if (isAdministrator) rules.emailDisabled = false

    return rules
  }, [isAdministrator, targetUser])
}
