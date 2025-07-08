import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { UserEditForm } from 'meta/form/userEdit/form'
import { User, Users } from 'meta/user'
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

export type UserEditProps = {
  user: Pick<User, 'id'> & {
    email?: string
    profilePictureFileUuid?: string
    props: Pick<UserProps, 'name' | 'surname' | 'title'>
  }
  // role?: Pick<UserRole, 'id' | 'role'> & { props: Partial<UserRole['props']> }
}

const toUserEditProps = (props: Props): UserEditProps => {
  const { user, userEditForm } = props

  const userEditProps: UserEditProps = {
    user: {
      id: userEditForm.user_id,
      props: {
        name: userEditForm.user_props_name,
        surname: userEditForm.user_props_surname,
        title: userEditForm.user_props_title,
      },
    },
  }

  // only admin can update the email
  if (Users.isAdministrator(user)) {
    userEditProps.user.email = userEditForm.user_email
  }

  return userEditProps
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { profilePicture, user } = props

  const { user: userToUpdate } = toUserEditProps(props)

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
