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

export const updateRolePermissions = async (props: UpdateRoleProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, targetUser, user, userEditForm } = props
  const { role } = userEditForm

  if (!role?.permissions) return

  const existingRole: UserRoleExtended<RoleName> = targetUser.roles.find((r) => role.uuid === r.uuid)
  if (!Authorizer.canEditUserRolePermissions({ user, countryIso: existingRole.countryIso, cycle, target: targetUser }))
    return

  const updatedRole = await UserRoleRepository.updateProps(
    { id: existingRole.id, permissions: role.permissions },
    client
  )

  const target = { roles: [updatedRole], userUuid: targetUser.uuid }
  const message = ActivityLogMessage.userRoleUpdatePermissions
  const activityLog = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, client)
}
