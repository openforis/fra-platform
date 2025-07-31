import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { User, Users } from 'meta/user'

import { BaseProtocol } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRoleRepository } from 'server/repository/public/userRole'

import { Props } from './props'

type UpdateRoleProps = Props & {
  targetUser: User
}

export const updateRoles = async (props: UpdateRoleProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, targetUser, user, userEditForm } = props
  const { roles } = userEditForm

  if (!roles || !Users.isAdministrator(user) || String(user.id) === String(targetUser.id)) return

  const rolesUpdated = await UserRoleRepository.updateRoles({ assessment, cycle, roles, user: targetUser }, client)

  const rolesActivity = rolesUpdated.map((r) => ({ role: r.role, countryIso: r.countryIso }))
  const target = { roles: rolesActivity, userUuid: targetUser.uuid }
  const message = ActivityLogMessage.userRolesUpdate
  const activityLog: ActivityLog<typeof target> = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, client)
}
