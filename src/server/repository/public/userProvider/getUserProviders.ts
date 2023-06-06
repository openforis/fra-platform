import { AuthProvider, User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

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
