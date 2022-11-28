import { Objects } from '@utils/objects'

import { UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps, AuthProviderLocalProps } from '@meta/user/userAuth'

import { BaseProtocol, DB } from '@server/db'

export const create = async (
  props: {
    provider: Pick<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>, 'userId' | 'props' | 'provider'>
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>> => {
  const {
    provider: { provider: authProvider, props: providerProps, userId },
  } = props

  return client.one<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>>(
    `
        insert into public.users_auth_provider (user_id, provider, props) values ($1, $2, $3::jsonb) returning *;
    `,
    [userId, authProvider, JSON.stringify(providerProps)],
    Objects.camelize
  )
}
