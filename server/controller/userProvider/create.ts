import { BaseProtocol, DB } from '@server/db'
import { User, UserAuthProvider } from '@meta/user'
import { UserProviderRepository } from '@server/repository'

export const create = async (
  props: {
    user: User
    provider: Pick<UserAuthProvider<{ password: string }>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, provider } = props

  return client.tx(async (t) => {
    await UserProviderRepository.create(
      {
        provider: {
          ...provider,
          userId: user.id,
        },
      },
      t
    )

    return user
  })
}
