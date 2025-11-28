import { AuthProviderGoogleProps, AuthProviderLocalProps, UserAuthProvider } from 'meta/user/auth'
import { User, UserProps } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'

export const create = async (
  props: {
    user: { email: string; props: Partial<UserProps> }
    provider: Pick<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { provider, user } = props

  return client.tx(async (t) => {
    const newUser = await UserRepository.create({ user }, t)

    await UserProviderRepository.create(
      {
        provider: {
          ...provider,
          userUuid: newUser.uuid,
        },
      },
      t
    )

    return newUser
  })
}
