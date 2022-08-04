import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const update = async (
  props: {
    user: User
    profilePicture?: Express.Multer.File | null
    isAdministrator: boolean
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, profilePicture, isAdministrator = false } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)

    if (isAdministrator) {
      UserRoleRepository.update({ user })
    }

    return UserRepository.update({ user, profilePicture }, t)
  })
}
