import { AuthProvider, User, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps, AuthProviderLocalProps } from '@meta/user/userAuth'

import { BaseProtocol, DB } from '@server/db'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const read = async (
  props: {
    provider: AuthProvider
    user: User
  },
  client: BaseProtocol = DB
): Promise<Array<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>>> => {
  const { provider, user } = props

  return UserProviderRepository.read({ user, provider }, client)
}
