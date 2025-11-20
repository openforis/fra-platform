import { Objects } from 'utils/objects'

import { AuthProvider, UserAuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

export const read = async <P>(
  props: { user: User; provider: AuthProvider },
  client: BaseProtocol = DB
): Promise<Array<UserAuthProvider<P>>> => {
  const { provider, user } = props

  return client.map<UserAuthProvider<P>>(
    `
        select * from public.users_auth_provider where user_uuid = $1 and provider = $2;
    `,
    [user.uuid, provider],
    (row) => Objects.camelize(row)
  )
}
