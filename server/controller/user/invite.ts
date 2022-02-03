import { BaseProtocol, DB, Schemas } from '@server/db'
import { RoleName, User, UserRole } from '@meta/user'
import { ActivityLogRepository, UserRepository, UserRoleRepository } from '@server/repository'
import { Assessment, ActivityLogMessage } from '@meta/assessment'
import { CountryIso } from '@meta/area'
import { MailService } from '@server/service'

export const invite = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycleUuid: string
    email: string
    roleName: RoleName
    user: User
    url?: string // application url
  },
  client: BaseProtocol = DB
): Promise<{ userRole: UserRole<RoleName, any>; user: User }> => {
  const { email, user, assessment, countryIso, roleName, cycleUuid, url = '' } = props
  const schemaName = Schemas.getName(assessment)

  return client.tx(async (t) => {
    let userToInvite = await UserRepository.read({ user: { email } }, client)
    if (!userToInvite) {
      userToInvite = await UserRepository.create({ user: { email, name: '' } })
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

    await MailService.userInvite({
      countryIso,
      role: userRole,
      userToInvite,
      user,
      url,
    })

    return {
      userRole,
      user: userToInvite,
    }
  })
}
