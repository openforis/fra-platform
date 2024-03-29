import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'
import { MailService } from 'server/service'

export const invite = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycle: Cycle
    email: string
    lang: Lang
    name?: string
    permissions?: CollaboratorPermissions
    roleName: RoleName
    surname?: string
    user: User
  },
  client: BaseProtocol = DB
): Promise<{ userRole: UserRole<RoleName>; user: User }> => {
  const { assessment, cycle, countryIso, email, lang, name, permissions, roleName, surname, user } = props

  return client.tx(async (t) => {
    // Get user with primary email
    let userToInvite = await UserRepository.getOne({ email }, t)
    // If user with primary email not found, check if user has active google login
    if (!userToInvite) userToInvite = await UserRepository.getOne({ emailGoogle: email }, t)
    // If neither of above, create new user
    if (!userToInvite)
      userToInvite = await UserRepository.create(
        { user: { email, props: { name: name ?? '', surname: surname ?? '', lang } } },
        client
      )

    const userRole = await UserRoleRepository.create(
      {
        assessment,
        country: countryIso,
        cycle,
        invitedByUserUuid: user.uuid,
        permissions,
        props: { address: { countryIso }, primaryEmail: email },
        role: roleName,
        user: userToInvite,
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
    })

    return {
      userRole,
      user: userToInvite,
    }
  })
}
