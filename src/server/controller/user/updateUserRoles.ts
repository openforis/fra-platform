import { ActivityLogMessage, CycleUuid } from 'meta/assessment'
import { RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'

type Props = {
  cycleUuid?: CycleUuid
  roles: Array<Partial<UserRole<RoleName>>>
  userUuid: User['uuid']
  user: User
}

export const updateUserRoles = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { cycleUuid, roles, userUuid, user } = props

  return client.tx(async (t) => {
    await UserRoleRepository.update({ cycleUuid, roles, userUuid }, t)

    const target = { roles, userUuid }
    const message = ActivityLogMessage.userRolesUpdate
    const activityLog = { target, section: 'users', message, user }

    await ActivityLogRepository.insertActivityLog({ activityLog }, t)

    return UserRepository.getOne({ uuid: userUuid, cycleUuid }, t)
  })
}
