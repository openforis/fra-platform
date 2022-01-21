import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { User, UserAuthProvider } from '@meta/user'

export const update = async (
  props: {
    user: Pick<User, 'id'>
    password: string
  },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<{ password: string }> | null> => {
  const {
    user: { id: userId },
    password,
  } = props

  return client.oneOrNone<UserAuthProvider<{ password: string }>>(
    `
      update public.users_auth_provider
      set props = props || '{"password": $1~}'
      where user_id = $2
      returning *
    `,
    [password, userId],
    Objects.camelize
  )
}
