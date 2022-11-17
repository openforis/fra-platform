import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { RoleName, User, UserRole, UserStatus } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/public/activityLog'
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
    if (UserRoles.isInvitationExpired(userRole)) throw new Error('Invitation has expired')

    await UserRoleRepository.acceptInvitation({ userRole }, t)

    user.status = UserStatus.active

    const { countryIso, userId, role } = userRole

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { userId, user: user.name, role },
          section: 'users',
          message: ActivityLogMessage.invitationAccept,
          countryIso,
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
