import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user'
import { UserRepository } from '@server/repository/user'

export const create = async (
  props: { user: Pick<User, 'name' | 'email'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  return client.tx(async (t) => {
    // insert entry in ActivityLog: Does not exist in public - should?
    return UserRepository.create({ user }, t)
  })
}
