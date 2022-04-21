import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'
import { MailService } from '@server/service'

export const invite = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycle: Cycle
    email: string
    roleName: RoleName
    user: User
    url?: string // application url
  },
  client: BaseProtocol = DB
): Promise<{ userRole: UserRole<RoleName, any>; user: User }> => {
  const { email, user, assessment, countryIso, roleName, cycle, url = '' } = props

  return client.tx(async (t) => {
    let userToInvite = await UserRepository.getOne({ email }, client)
    if (!userToInvite) {
      userToInvite = await UserRepository.create({ user: { email, name: '' } })
    }

    const userRole = await UserRoleRepository.create(
      {
        user: userToInvite,
        assessment,
        country: countryIso,
        role: roleName,
        cycle,
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
        assessment,
        cycle,
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
