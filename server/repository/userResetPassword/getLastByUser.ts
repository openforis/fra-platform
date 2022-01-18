import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { User, UserResetPassword } from '@meta/user'

export const getLastByUser = async (
  props: { user: User },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { user } = props

  return client.oneOrNone<UserResetPassword>(
    `
        select * from public.users_reset_password
        where created_at = (
          select max(created_at)
          from public.users_reset_password
          where user_id = $1
        );
    `,
    [user.id],
    Objects.camelize
  )
}
