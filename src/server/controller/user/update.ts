import { ActivityLogMessage } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
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
    if (profilePicture) {
      const createdFile = await FileRepository.create({ file: profilePicture }, client)
      userToUpdate.profilePictureFileUuid = createdFile.uuid
    }

    const updatedUser = await UserRepository.update({ user: userToUpdate }, t)

    // don't save thousands of lines about roles, they are saved separately
    delete updatedUser.roles

    const target = { user: updatedUser }
    const message = ActivityLogMessage.userUpdate
    const params = { activityLog: { target, section: 'users', message, user } }
    await ActivityLogRepository.insertActivityLog(params, t)

    return updatedUser
  })
}
