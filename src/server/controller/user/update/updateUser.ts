import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { UserEditCountryForm, UserForm } from 'meta/form/userEdit/form'
import { User, Users } from 'meta/user'

import { BaseProtocol } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
import { UserRepository } from 'server/repository/public/user'
import { FileStorage } from 'server/service/fileStorage'

import { Props } from './props'

export type UserEditProps = UserEditCountryForm & {
  user: UserForm & { profilePictureFileUuid?: string }
}

const toUserEditProps = (props: Props): UserEditProps => {
  const { user, userEditForm } = props

  // only admin can update the email
  if (!Users.isAdministrator(user)) {
    delete userEditForm.user.email
  }

  return userEditForm
}

export const updateUser = async (props: Props, client: BaseProtocol): Promise<User> => {
  const { profilePicture, user } = props
  const { user: userToUpdate } = toUserEditProps(props)

  if (profilePicture) {
    const createdFile = await FileRepository.create({ fileName: profilePicture.originalname }, client)
    const { uuid: key } = createdFile

    await FileStorage.File.upload({ key, body: profilePicture.buffer })
    userToUpdate.profilePictureFileUuid = createdFile.uuid
  }

  const updatedUser = await UserRepository.update({ user: userToUpdate }, client)

  // don't save thousands of lines about roles, they are saved separately
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { roles: _, ...userNoRoles } = updatedUser

  const target = { user: userNoRoles }
  const message = ActivityLogMessage.userUpdate
  const params = { activityLog: { target, section: 'users', message, user } }
  await ActivityLogRepository.insertActivityLog(params, client)

  return updatedUser
}
