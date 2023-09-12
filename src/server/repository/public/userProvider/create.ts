import { Objects } from 'utils/objects'

import { UserAuthProvider } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const create = async <P>(
  props: {
    provider: Pick<UserAuthProvider<P>, 'userId' | 'props' | 'provider'>
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<P>> => {
  const {
    provider: { provider: authProvider, props: providerProps, userId },
  } = props

  return client.one<UserAuthProvider<P>>(
    `
        insert into public.users_auth_provider (user_id, provider, props) values ($1, $2, $3::jsonb) returning *;
    `,
    [userId, authProvider, JSON.stringify(providerProps)],
    Objects.camelize
  )
}
