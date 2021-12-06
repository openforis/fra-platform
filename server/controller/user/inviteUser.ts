import { BaseProtocol, DB, Schemas } from '@server/db'
import { RoleNames, User, UserInvitation, UserStatus } from '@core/meta/user'
import { ActivityLogRepository, UserRepository, UserInvitationRepository } from '@server/repository'
import { Assessment, ActivityLogMessage } from '@core/meta/assessment'

export const inviteUser = async (
  props: {
    assessment: Assessment
    countryIso: string
    cycleUuid: string
    email: string
    roleName: RoleNames
    user: User
  },
  client: BaseProtocol = DB
): Promise<{ userInvitation: UserInvitation; user: User }> => {
  const { assessment, email, user } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    let userToInvite = await UserRepository.read({ user: { email } }, client)
    if (!userToInvite) {
      userToInvite = await UserRepository.create({ user: { email, name: '' } })
      userToInvite.status = UserStatus.invitationPending
      userToInvite = await UserRepository.update({ user: userToInvite }, client)
    }

    // await UserRolesRepository.create({}, client)

    const userInvitation = await UserInvitationRepository.create({ user: userToInvite }, client)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: userInvitation,
          section: 'assessment',
          message: ActivityLogMessage.userInvitationCreate,
          user,
        },
        schemaName,
      },
      t
    )

    return {
      userInvitation,
      user: userToInvite,
    }
  })
}
