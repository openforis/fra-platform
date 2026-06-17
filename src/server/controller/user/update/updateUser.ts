import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Authorizer } from 'meta/auth/authorizer'
import { UserEditCountryForm, UserForm } from 'meta/form/userEdit/form'
import { User, UserStatus } from 'meta/user/user'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

import { BaseProtocol } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { FileRepository } from 'server/db/repository/public/file'
import { UserRepository } from 'server/db/repository/public/user'
import { FileStorage } from 'server/service/fileStorage'

import { Props } from './props'

export type UserEditProps = UserEditCountryForm & {
  user: Omit<UserForm, 'disabled'> & { status?: UserStatus; profilePictureFileUuid?: string }
}

const toUserEditProps = async (props: Props, client: BaseProtocol): Promise<UserEditProps> => {
  const { countryIso, cycle, user, userEditForm } = props
  const userEditProps: UserEditProps = { ...userEditForm }

  // only admin can update the email
  if (!Users.isAdministrator(user)) {
    delete userEditProps.user.email
  }
  const { disabled } = userEditForm.user
  if (!Objects.isNil(disabled)) {
    const targetUser = await UserRepository.getOne(
      { id: userEditForm.user.id, cycleUuid: cycle.uuid, allowDisabled: true },
      client
    )
    if (Authorizer.canDisableUser({ countryIso, cycle, user, target: targetUser })) {
      userEditProps.user.status = disabled ? UserStatus.disabled : UserStatus.active
    }
  }

  delete userEditProps.user.disabled

  return userEditProps
}

export const updateUser = async (props: Props, client: BaseProtocol): Promise<User> => {
  const { profilePicture, user } = props
  const { user: userToUpdate } = await toUserEditProps(props, client)

  if (profilePicture) {
    const createdFile = await FileRepository.create(
      { fileName: profilePicture.originalname, size: profilePicture.size },
      client
    )
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
