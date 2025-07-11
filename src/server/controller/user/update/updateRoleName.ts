import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Authorizer, RoleName, User } from 'meta/user'
import { UserRoleExtended } from 'meta/user/userRole'

import { BaseProtocol } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRoleRepository } from 'server/repository/public/userRole'

import { Props } from './props'

type UpdateRoleProps = Props & {
  targetUser: User
}

export const updateRoleName = async (props: UpdateRoleProps, client: BaseProtocol): Promise<User> => {
  const { cycle, targetUser, user, userEditForm } = props
  const { role } = userEditForm

  if (!role.role) return targetUser

  const existingRole: UserRoleExtended<RoleName> = targetUser.roles.find((r) => role.uuid === r.uuid)
  if (
    !Authorizer.canEditUserRoleName({ user, countryIso: existingRole.countryIso, cycle, target: targetUser }) ||
    existingRole.role === role.role
  )
    return targetUser

  const updatedRole = await UserRoleRepository.updateProps({ id: existingRole.id, role: role.role }, client)

  // activity log
  const target = { roles: [updatedRole], userUuid: targetUser.uuid }
  const message = ActivityLogMessage.userRoleUpdateRole
  const activityLog = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ activityLog }, client)

  // return targetUser with updated role name
  targetUser.roles = targetUser.roles.map((r) => {
    if (r.uuid === updatedRole.uuid) return updatedRole
    return r
  })
  return targetUser
}
