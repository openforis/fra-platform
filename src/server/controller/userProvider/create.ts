import { User, UserAuthProvider } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const create = async (
  props: {
    user: User
    provider: Pick<UserAuthProvider<{ password?: string; email?: string }>, 'provider' | 'props'>
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
