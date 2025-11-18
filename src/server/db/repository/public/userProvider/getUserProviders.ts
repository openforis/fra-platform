import { AuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

export const getUserProviders = async (
  props: { user: User },
  client: BaseProtocol = DB
): Promise<Array<AuthProvider>> => {
  const { user } = props

  return client.map<AuthProvider>(
    `
        select distinct(provider) from public.users_auth_provider where user_id = $1;
    `,
    [user.id],
    (row) => row.provider
  )
}
