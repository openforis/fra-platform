import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { RoleName, User, UserRole, UserStatus } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const acceptInvitation = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    user: User
    userRole: UserRole<RoleName>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { assessment, cycle, user, userRole } = props

  return client.tx(async (t) => {
    await UserRoleRepository.acceptInvitation({ userRole }, t)

    user.status = UserStatus.active

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { user: user.name, role: userRole.role },
          section: 'users',
          message: ActivityLogMessage.acceptInvitation,
          countryIso: userRole.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return UserRepository.update({ user }, t)
  })
}
