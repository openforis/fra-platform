import { User } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'

export const remove = async (
  props: {
    user: Pick<User, 'email'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  return client.tx(async (t) => {
    // TODO: handle activityLog?
    return UserRepository.remove({ user }, t)
  })
}
