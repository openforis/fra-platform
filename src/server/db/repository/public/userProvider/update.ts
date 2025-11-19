import { Objects } from 'utils/objects'

import { AuthProvider, AuthProviderLocalProps, UserAuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

export const update = async (
  props: { user: Pick<User, 'id'>; password: string },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<AuthProviderLocalProps>> => {
  const {
    password,
    user: { id: userId },
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
