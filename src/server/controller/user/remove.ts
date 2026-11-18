import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogUserRemove } from 'meta/assessment/activityLog/user'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRepository } from 'server/db/repository/public/user'

export const remove = async (
  props: {
    userToRemove: Pick<User, 'email'>
    user: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, userToRemove } = props

  return client.tx(async (t) => {
    const removedUser = await UserRepository.remove({ user: userToRemove }, t)

    const activityLog: ActivityLogUserRemove = {
      target: { user: removedUser },
      section: 'users',
      message: ActivityLogMessage.userRemove,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog }, t)

    return removedUser
  })
}
