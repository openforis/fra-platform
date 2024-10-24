import { Objects } from 'utils/objects'

import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User, UserInvitation, UserInvitations, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { UserRoleRepository } from 'server/repository/public/userRole'
import { MailService } from 'server/service'

// Accept invitation flow:
// 1. UserInvitationRepository.accept: update field acceptedAt
// 2. UserRoleRepository.create: create user role
// 3. ActivityLogRepository.insertActivityLog: log activity
// 4. MailService.userNotifyAcceptedInvitation
// 5. UserRepository.update

type Props = {
  assessment: Assessment
  cycle: Cycle
  user: User
  userInvitation: UserInvitation
}

export const acceptInvitation = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { assessment, cycle, user, userInvitation: userInvitationProp } = props

  return client.tx(async (t) => {
    if (UserInvitations.isExpired(userInvitationProp)) throw new Error('login.invitationExpired')
    if (userInvitationProp.acceptedAt !== null) throw new Error('login.alreadyAcceptedInvitation')

    const userInvitation = await UserInvitationRepository.accept({ userInvitation: userInvitationProp }, t)
    const assessmentUuid = assessment.uuid
    const cycleUuid = cycle.uuid
    const { countryIso } = userInvitation
    const userUuid = user.uuid
    const { role } = userInvitation
    const invitationUuid = userInvitation.uuid
    const userRoleCreateProps = { assessmentUuid, cycleUuid, countryIso, userUuid, role, invitationUuid }

    const userRole = await UserRoleRepository.create(userRoleCreateProps, t)

    user.status = UserStatus.active

    const target = { userUuid, user: user.props.name, role }
    const activityLog = { target, section: 'users', message: ActivityLogMessage.invitationAccept, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    if (!Objects.isEmpty(userInvitation.invitedByUserUuid)) {
      const recipient = await UserRepository.getOne({ uuid: userInvitation.invitedByUserUuid })
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const invitedUser = user
      const invitedUserRole = userRole
      const mailServiceProps = { assessmentName, countryIso, cycleName, invitedUser, invitedUserRole, recipient }
      await MailService.userNotifyAcceptedInvitation(mailServiceProps)
    }

    return UserRepository.update({ user }, t)
  })
}
