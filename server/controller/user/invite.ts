import { BaseProtocol, DB, Schemas } from '@server/db'
import { RoleName, User, UserInvitation } from '@core/meta/user'
import { ActivityLogRepository, UserRepository, UserInvitationRepository } from '@server/repository'
import { Assessment, ActivityLogMessage } from '@core/meta/assessment'
import { CountryIso } from '@core/country'

export const invite = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycleUuid: string
    email: string
    roleName: RoleName
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
    }

    // await UserRolesRepository.create({}, client)

    const userInvitation = await UserInvitationRepository.create({ user: userToInvite }, client)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: userInvitation,
          section: 'assessment',
          message: ActivityLogMessage.userInvited,
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
