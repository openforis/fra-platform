import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { AuthProvider, User, UserAuthProvider } from '@meta/user'

export const read = async (
  props: { user: User; provider: AuthProvider },
  client: BaseProtocol = DB
): Promise<UserAuthProvider<{ password: string }>> => {
  const { user, provider } = props

  return client.one<UserAuthProvider<{ password: string }>>(
    `
        select * from  public.users_auth_provider uap where uap.user_id = $1 and provider = $2;
    `,
    [user.id, provider],
    Objects.camelize
  )
}
