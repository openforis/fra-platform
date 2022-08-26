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
    name?: string
    roleName: RoleName
    user: User
  },
  client: BaseProtocol = DB
): Promise<{ userRole: UserRole<RoleName>; user: User }> => {
  const { user, assessment, countryIso, email, name, roleName, cycle } = props

  return client.tx(async (t) => {
    let userToInvite = await UserRepository.getOne({ email }, client)

    if (!userToInvite) {
      userToInvite = await UserRepository.create({ user: { email, name: name ?? '' } })
    }

    const userRole = await UserRoleRepository.create(
      {
        user: userToInvite,
        assessment,
        country: countryIso,
        role: roleName,
        cycle,
      },
      t
    )

    userToInvite = await UserRepository.getOne({ email }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { user: userToInvite.name, role: userRole.role },
          section: 'users',
          message: ActivityLogMessage.addInvitation,
          countryIso,
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
      url: process.env.APP_URI,
    })

    return {
      userRole,
      user: userToInvite,
    }
  })
}
