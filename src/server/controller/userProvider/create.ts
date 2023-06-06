import { User, UserAuthProvider } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserProviderRepository } from 'server/repository/public/userProvider'

export const create = async <P>(
  props: {
    user: User
    provider: Pick<UserAuthProvider<P>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<P>> => {
  const { user, provider } = props

  return UserProviderRepository.create<P>(
    {
      provider: {
        ...provider,
        userId: user.id,
      },
    },
    client
  )
}
