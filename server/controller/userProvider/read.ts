import { AuthProvider, User, UserAuthProvider } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const read = async (
  props: {
    provider: AuthProvider
    user: User
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<{ password: string }>> => {
  const { provider, user } = props

  return UserProviderRepository.read({ user, provider }, client)
}
