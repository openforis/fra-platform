import { Objects } from 'utils/objects'

import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserRole, UserStatus } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'
import { MailService } from 'server/service'

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
    if (UserRoles.isInvitationExpired(userRole)) throw new Error('login.invitationExpired')
    if (userRole.acceptedAt !== null) throw new Error('login.alreadyAcceptedInvitation')

    await UserRoleRepository.acceptInvitation({ userRole }, t)

    user.status = UserStatus.active

    const { countryIso, userId, role } = userRole

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { userId, user: user.props.name, role },
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

    if (!Objects.isEmpty(userRole.invitedByUserUuid)) {
      const invitingUser = await UserRepository.getOne({ uuid: userRole.invitedByUserUuid })
      await MailService.userNotifyAcceptedInvitation({
        assessmentName: assessment.props.name,
        countryIso,
        cycleName: cycle.name,
        invitedUser: user,
        invitedUserRole: userRole,
        recipient: invitingUser,
      })
    }

    return UserRepository.update({ user }, t)
  })
}
