import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserInvitation } from 'meta/user/invitation'
import { UserInvitations } from 'meta/user/invitations'
import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'
import { User, UserProps, UserStatus } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRepository } from 'server/db/repository/public/user'
import { UserInvitationRepository } from 'server/db/repository/public/userInvitation'
import { UserRoleRepository } from 'server/db/repository/public/userRole'
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
  roleProps?: UserRoleBaseProps | UserRoleExtendedProps
  user: User
  userInvitation: UserInvitation
  userProps?: Pick<UserProps, 'name' | 'surname' | 'title'>
}

export const acceptInvitation = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { assessment, cycle, roleProps, user, userInvitation: userInvitationProp, userProps } = props

  return client.tx(async (t) => {
    if (UserInvitations.isExpired(userInvitationProp)) throw new Error('login.invitationExpired')
    if (userInvitationProp.acceptedAt !== null) throw new Error('login.alreadyAcceptedInvitation')

    const userInvitation = await UserInvitationRepository.accept({ userInvitation: userInvitationProp }, t)
    const assessmentUuid = assessment.uuid
    const cycleUuid = cycle.uuid
    const userUuid = user.uuid
    const { countryIso, permissions, role, uuid: invitationUuid } = userInvitation
    const userRoleCreateProps = {
      assessmentUuid,
      countryIso,
      cycleUuid,
      invitationUuid,
      permissions,
      props: roleProps,
      role,
      userUuid,
    }

    const userRole = await UserRoleRepository.create(userRoleCreateProps, t)

    if (userProps) user.props = { ...user.props, ...userProps }
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

    return UserRepository.update({ user, cycleUuid }, t)
  })
}
