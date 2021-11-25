import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user'
import { UserRepository } from '@server/repository'

export const read = async (
  props: {
    user: Pick<User, 'email'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  return UserRepository.read({ user }, client)
}
