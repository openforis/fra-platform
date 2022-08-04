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
  const { user, profilePicture } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)

    if (user && Users.isAdministrator(user)) {
      UserRoleRepository.update({ user }, t)
    }

    return UserRepository.update({ user, profilePicture }, t)
  })
}
