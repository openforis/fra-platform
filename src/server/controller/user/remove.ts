import { ActivityLogMessage } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'

export const remove = async (
  props: {
    userToRemove: Pick<User, 'email'>
    user: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { userToRemove, user } = props

  return client.tx(async (t) => {
    const removedUser = await UserRepository.remove({ user: userToRemove }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { user: removedUser },
          section: 'users',
          message: ActivityLogMessage.userRemove,
          user,
        },
      },
      t
    )

    return removedUser
  })
}
