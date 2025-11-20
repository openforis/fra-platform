import { Objects } from 'utils/objects'

import { AuthProvider, AuthProviderLocalProps, UserAuthProvider } from 'meta/user/auth'
import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'

type Props = { userUuid: UUID; password: string }
type Returned = Promise<UserAuthProvider<AuthProviderLocalProps>>

export const update = async (props: Props, client: BaseProtocol = DB): Returned => {
  const { password, userUuid } = props

  return client.oneOrNone<UserAuthProvider<AuthProviderLocalProps>>(
    `
      update public.users_auth_provider
      set props = props || '{"password": $1~}'
      where user_uuid = $2 and provider = $3
      returning *
    `,
    [password, userUuid, AuthProvider.local],
    Objects.camelize
  )
}
