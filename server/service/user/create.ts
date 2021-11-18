import { BaseProtocol, DB } from '@server/db'
import { User, UserProvider } from '@core/meta/user'
import { UserRepository, UserProviderRepository } from '@server/repository'

export const create = async (
  props: {
    user: Pick<User, 'name' | 'email'>
    provider: Pick<UserProvider<{ password: string }>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, provider } = props

  return client.tx(async (t) => {
    // TODO: we should only record when the user has been invited to a specific assessment. maybe insert an entry only when the user has been invited?
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
