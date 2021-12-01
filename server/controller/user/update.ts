import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user/user'
import { UserRepository } from '@server/repository'

export const update = async (
  props: {
    user: User
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)
    return UserRepository.update({ user }, t)
  })
}
