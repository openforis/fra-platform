import { Objects } from 'utils/objects'

import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Authorizer } from 'meta/auth/authorizer'
import { RoleName } from 'meta/user/role/name'
import { UserRoleExtended } from 'meta/user/role/role'
import { User } from 'meta/user/user'

import { BaseProtocol } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRoleRepository } from 'server/db/repository/public/userRole'

import { Props } from './props'

type UpdateRoleProps = Props & {
  targetUser: User
}

export const updateRoleProps = async (props: UpdateRoleProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, targetUser, user, userEditForm } = props
  const { role } = userEditForm

  if (!role?.props) return

  const existingRole: UserRoleExtended<RoleName> = targetUser.roles.find((r) => role.uuid === r.uuid)
  if (!Authorizer.canEditUserRoleProps({ user, countryIso: existingRole.countryIso, cycle, target: targetUser })) return

  const updatedRole = Objects.merge(existingRole, role)

  await UserRoleRepository.updateProps({ id: existingRole.id, props: updatedRole.props }, client)

  const target = { roles: [updatedRole], userUuid: targetUser.uuid }
  const message = ActivityLogMessage.userRoleUpdateProps
  const activityLog = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, client)
}
