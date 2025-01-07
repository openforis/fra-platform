import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User, UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  invitationUuid: string
  user: User
}

export const removeInvitation = async (props: Props, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { countryIso, assessment, cycle, invitationUuid, user } = props

  return client.tx(async (t) => {
    const userInvitation = await UserInvitationRepository.remove({ invitationUuid }, t)

    const invitedUser = await UserRepository.getOne({ uuid: userInvitation.userUuid })
    const { userUuid, role } = userInvitation

    const target = { userUuid, user: invitedUser.props.name, role }
    const message = ActivityLogMessage.invitationRemove
    const activityLog = { target, section: 'users', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return userInvitation
  })
}
