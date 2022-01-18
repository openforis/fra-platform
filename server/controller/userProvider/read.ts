import { BaseProtocol, DB } from '@server/db'
import { AuthProvider, User, UserAuthProvider } from '@meta/user'
import { UserProviderRepository } from '@server/repository'

export const read = async (
  props: {
    provider: AuthProvider,
    user: User,
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<{ password: string }>> => {
  const { provider, user } = props

  return UserProviderRepository.read({ user, provider }, client)
}
