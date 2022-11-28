import { User, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps, AuthProviderLocalProps } from '@meta/user/userAuth'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const create = async (
  props: {
    user: Pick<User, 'name' | 'email'>
    provider: Pick<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, provider } = props

  return client.tx(async (t) => {
    const newUser = await UserRepository.create({ user }, t)

    await UserProviderRepository.create(
      {
        provider: {
          ...provider,
          userId: newUser.id,
        },
      },
      t
    )

    return newUser
  })
}
