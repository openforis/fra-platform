import { ActivityLogMessage } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'

export const update = async (
  props: {
    userToUpdate: User
    profilePicture?: Express.Multer.File | null
    user: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { userToUpdate, profilePicture, user } = props

  return client.tx(async (t) => {
    const updatedUser = await UserRepository.update({ user: userToUpdate, profilePicture }, t)

    // don't save thousands of lines about roles, they are saved separately
    delete updatedUser.roles

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { user: updatedUser },
          section: 'users',
          message: ActivityLogMessage.userUpdate,
          user,
        },
      },
      t
    )

    return updatedUser
  })
}
