import { AuthProvider, UserAuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  provider: AuthProvider
  user: User
}

export const read = async <P>(props: Props, client: BaseProtocol = DB): Promise<UserAuthProvider<P> | null> => {
  const { provider, user } = props

  return client.oneOrNone<UserAuthProvider<P>>(
    `
        select * from public.users_auth_provider where user_uuid = $1 and provider = $2;
    `,
    [user.uuid, provider],
    (row) => Objects.camelize(row)
  )
}
