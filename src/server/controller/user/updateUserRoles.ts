import { ActivityLogMessage } from 'meta/assessment'
import { RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'

export const updateUserRoles = async (
  props: {
    cycleUuid?: string
    roles: Array<Partial<UserRole<RoleName>>>
    userId: number
    user: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { cycleUuid, roles, userId, user } = props

  return client.tx(async (t) => {
    await UserRoleRepository.update({ cycleUuid, roles, userId }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { roles, userId },
          section: 'users',
          message: ActivityLogMessage.userRolesUpdate,
          user,
        },
      },
      t
    )

    return UserRepository.getOne({ id: userId, cycleUuid }, t)
  })
}
