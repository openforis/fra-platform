import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'
import { MailService } from '@server/service'

export const sendInvitationEmail = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    invitationUuid: string
    user: User
    url?: string // application url
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { countryIso, assessment, cycle, invitationUuid, user, url } = props

  return client.tx(async (t) => {
    const userRole = await UserRoleRepository.read({ invitationUuid })

    const userToInvite = await UserRepository.getOne({ id: userRole.userId })

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
  })
}
