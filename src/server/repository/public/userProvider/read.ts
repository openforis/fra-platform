import { Objects } from '@utils/objects'

import { AuthProvider, User, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps, AuthProviderLocalProps } from '@meta/user/userAuth'

import { BaseProtocol, DB } from '@server/db'

export const read = async (
  props: { user: User; provider: AuthProvider },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>> => {
  const { user, provider } = props

  return client.oneOrNone<UserAuthProvider<AuthProviderGoogleProps | AuthProviderLocalProps>>(
    `
        select * from  public.users_auth_provider uap where uap.user_id = $1 and provider = $2;
    `,
    [user.id, provider],
    Objects.camelize
  )
}
