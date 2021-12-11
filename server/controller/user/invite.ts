import { BaseProtocol, DB, Schemas } from '@server/db'
import { RoleName, User, UserRole } from '@core/meta/user'
import { ActivityLogRepository, UserRepository, UserRoleRepository } from '@server/repository'
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
): Promise<{ userRole: UserRole<RoleName, any>; user: User }> => {
  const { email, user, assessment, countryIso, roleName, cycleUuid } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    let userToInvite = await UserRepository.read({ user: { email } }, client)
    if (!userToInvite) {
      userToInvite = await UserRepository.create({ user: { email, name: 'Unknown' } })
    }

    const userRole = await UserRoleRepository.create(
      {
        user: userToInvite,
        assessment,
        country: countryIso,
        role: roleName,
        cycle: cycleUuid,
      },
      client
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: userRole,
          section: 'assessment',
          message: ActivityLogMessage.userInvited,
          user,
        },
        schemaName,
      },
      t
    )

    return {
      userRole,
      user: userToInvite,
    }
  })
}
