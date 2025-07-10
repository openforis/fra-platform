import { Objects } from 'utils/objects'

import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Cycle } from 'meta/assessment/cycle'
import { UserEditCountryForm, UserForm } from 'meta/form/userEdit/form'
import { RoleName, User, Users } from 'meta/user'
import { UserRoleExtended } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
import { UserRepository } from 'server/repository/public/user'
import { UserRoleRepository } from 'server/repository/public/userRole'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  userEditForm: UserEditCountryForm
  profilePicture?: Express.Multer.File | null
  user: User
  cycle: Cycle
}

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

const _updateUser = async (props: Props, client: BaseProtocol): Promise<User> => {
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
  delete updatedUser.roles

  const target = { user: updatedUser }
  const message = ActivityLogMessage.userUpdate
  const params = { activityLog: { target, section: 'users', message, user } }
  await ActivityLogRepository.insertActivityLog(params, client)

  return updatedUser
}

const _updateRole = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { user, userEditForm } = props
  const { role } = userEditForm

  const existingRole: UserRoleExtended<RoleName> = await UserRoleRepository.getOne({ uuid: role.uuid }, client)
  const updatedRole = Objects.merge(existingRole, role)

  await UserRoleRepository.updateProps({ id: existingRole.id, props: updatedRole.props }, client)

  const target = { roles: [updatedRole], userUuid: userEditForm.user.uuid }
  const message = ActivityLogMessage.userRolesUpdate
  const activityLog = { target, section: 'users', message, user }

  await ActivityLogRepository.insertActivityLog({ activityLog }, client)
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { cycle } = props

  return client.tx(async (t) => {
    const updatedUser = await _updateUser(props, t)
    await _updateRole(props, t)

    return UserRepository.getOne({ uuid: updatedUser.uuid, cycleUuid: cycle.uuid }, t)
  })
}
