import { User, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps, AuthProviderLocalProps } from '@meta/user/userAuth'

import { BaseProtocol, DB } from '@server/db'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const create = async (
  props: {
    user: User
    provider: Pick<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>> => {
  const { user, provider } = props

  return UserProviderRepository.create(
    {
      provider: {
        ...provider,
        userId: user.id,
      },
    },
    client
  )
}
