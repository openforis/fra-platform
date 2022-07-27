import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'

export const update = async (
  props: {
    user: User
    profilePicture: Express.Multer.File | null
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, profilePicture } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)
    return UserRepository.update({ user, profilePicture }, t)
  })
}
