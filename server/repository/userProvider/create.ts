import { BaseProtocol, DB } from '@server/db'
import { User, UserProvider } from '@core/meta/user'
import { Objects } from '@core/utils'

export const create = async (
  props: { provider: Pick<UserProvider<{ password: string }>, 'userId' | 'props' | 'provider'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    provider: { provider: authProvider, props: providerProps, userId },
  } = props

  return client.one<User>(
    `
        insert into public.users_provider (user_id, provider, props) values ($1, $2, $3::jsonb) returning *;
    `,
    [userId, authProvider, JSON.stringify(providerProps)],
    Objects.camelize
  )
}
