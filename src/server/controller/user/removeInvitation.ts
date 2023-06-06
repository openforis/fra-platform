import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'

export const removeInvitation = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    invitationUuid: string
    user: User
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { countryIso, assessment, cycle, invitationUuid, user } = props

  return client.tx(async (t) => {
    const userRole = await UserRoleRepository.remove({ invitationUuid }, t)

    const invitedUser = await UserRepository.getOne({ id: userRole.userId })

    const { userId, role } = userRole

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { userId, user: invitedUser.props.name, role },
          section: 'users',
          message: ActivityLogMessage.invitationRemove,
          countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return userRole
  })
}
