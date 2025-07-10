import { Objects } from 'utils/objects'

import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { RoleName, User } from 'meta/user'
import { UserRoleExtended } from 'meta/user/userRole'

import { BaseProtocol } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRoleRepository } from 'server/repository/public/userRole'

import { Props } from './props'

type UpdateRoleProps = Props & {
  targetUser: User
}

export const updateRole = async (props: UpdateRoleProps, client: BaseProtocol): Promise<void> => {
  const { targetUser, user, userEditForm } = props
  const { role } = userEditForm

  const existingRole: UserRoleExtended<RoleName> = targetUser.roles.find((r) => role.uuid === r.uuid)
  const updatedRole = Objects.merge(existingRole, role)

  await UserRoleRepository.updateProps({ id: existingRole.id, props: updatedRole.props }, client)

  const target = { roles: [updatedRole], userUuid: targetUser.uuid }
  const message = ActivityLogMessage.userRolesUpdate
  const activityLog = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ activityLog }, client)
}
