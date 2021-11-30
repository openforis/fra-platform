import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user'
import { UserRepository } from '@server/repository'

export const inviteUser = async (
  props: {
    user: Pick<User, 'id'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  return UserRepository.inviteUser({ user }, client)
}
