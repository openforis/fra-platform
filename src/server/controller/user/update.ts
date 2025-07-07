import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { UserEditForm } from 'meta/form/userEdit'
import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
import { UserRepository } from 'server/repository/public/user'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  userEditForm: UserEditForm
  profilePicture?: Express.Multer.File | null
  user: User
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { profilePicture, user, userEditForm } = props

  const userProps: Partial<UserProps> = {
    title: userEditForm.title,
    name: userEditForm.name,
    surname: userEditForm.surname,
  }

  const userToUpdate: Partial<Omit<User, 'props'> & { props: Partial<UserProps> }> = {
    id: userEditForm.userId,
    email: userEditForm.email,
    props: userProps,
  }

  return client.tx(async (t) => {
    if (profilePicture) {
      const createdFile = await FileRepository.create({ fileName: profilePicture.originalname }, client)
      const { uuid: key } = createdFile

      await FileStorage.File.upload({ key, body: profilePicture.buffer })
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
