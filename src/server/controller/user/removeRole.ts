import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRoleRepository } from 'server/db/repository/public/userRole'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  target: User
  user: User
}

export const removeRole = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, target, user } = props

  return client.tx(async (t) => {
    const role = Users.getRole(target, countryIso, cycle)
    await UserRoleRepository.remove({ uuid: role.uuid }, t)

    const activityLog = {
      target: { userUuid: target.uuid, user: target.props.name, countryIso, role: role.role },
      section: 'users',
      message: ActivityLogMessage.userRoleDeleteRole,
      countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
