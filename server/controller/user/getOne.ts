import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { UserRepository } from '@server/repository'

export const getOne = async (
  props: {
    user: Pick<User, 'email'>
    emailGoogle?: string
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, emailGoogle } = props

  return UserRepository.getOne({ user, emailGoogle }, client)
}
