import { Objects } from 'utils/objects'

import { User, UserAuthProvider } from 'meta/user'
import { AuthProvider, AuthProviderLocalProps } from 'meta/user/userAuth'

import { BaseProtocol, DB } from 'server/db'

export const update = async (
  props: { user: Pick<User, 'id'>; password: string },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<AuthProviderLocalProps>> => {
  const {
    user: { id: userId },
    password,
  } = props

  return client.oneOrNone<UserAuthProvider<AuthProviderLocalProps>>(
    `
      update public.users_auth_provider
      set props = props || '{"password": $1~}'
      where user_id = $2 and provider = $3
      returning *
    `,
    [password, userId, AuthProvider.local],
    Objects.camelize
  )
}
