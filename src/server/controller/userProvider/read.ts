import { AuthProvider, User, UserAuthProvider } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'

export const read = async <P>(
  props: {
    provider: AuthProvider
    user: User
  },
  client: BaseProtocol = DB
): Promise<Array<UserAuthProvider<P>>> => {
  const { provider, user } = props

  return UserProviderRepository.read<P>({ user, provider }, client)
}
