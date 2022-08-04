import { User, Users } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const update = async (
  props: {
    userToUpdate: User
    profilePicture?: Express.Multer.File | null
    user?: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { userToUpdate, profilePicture, user } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)

    if (user && Users.isAdministrator(user)) {
      UserRoleRepository.update({ user: userToUpdate }, t)
    }

    return UserRepository.update({ user: userToUpdate, profilePicture }, t)
  })
}
