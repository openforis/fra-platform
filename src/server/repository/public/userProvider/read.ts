import { Objects } from 'utils/objects'

import { AuthProvider, User, UserAuthProvider } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const read = async <P>(
  props: { user: User; provider: AuthProvider },
  client: BaseProtocol = DB
): Promise<Array<UserAuthProvider<P>>> => {
  const { user, provider } = props

  return client.map<UserAuthProvider<P>>(
    `
        select * from public.users_auth_provider where user_id = $1 and provider = $2;
    `,
    [user.id, provider],
    (row) => Objects.camelize(row)
  )
}
