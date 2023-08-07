import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'
import { MailService } from 'server/service'
import { ProcessEnv } from 'server/utils'

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
    // Get user with primary email
    let userToInvite = await UserRepository.getOne({ email }, t)
    // If user with primary email not found, check if user has active google login
    if (!userToInvite) userToInvite = await UserRepository.getOne({ emailGoogle: email }, t)
    // If neither of above, create new user
    if (!userToInvite)
      userToInvite = await UserRepository.create(
        { user: { email, props: { name: name ?? '', lang: user.props.lang ?? Lang.en } } },
        client
      )

    const userRole = await UserRoleRepository.create(
      {
        user: userToInvite,
        assessment,
        country: countryIso,
        role: roleName,
        cycle,
        props: { primaryEmail: email, address: { countryIso } },
      },
      t
    )

    const { userId, role } = userRole

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { userId, user: userToInvite.props.name, role },
          section: 'users',
          message: ActivityLogMessage.invitationAdd,
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
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      role: userRole,
      userToInvite,
      url: ProcessEnv.appUri,
    })

    return {
      userRole,
      user: userToInvite,
    }
  })
}
