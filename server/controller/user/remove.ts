import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user/user'
import { UserRepository } from '@server/repository'

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
