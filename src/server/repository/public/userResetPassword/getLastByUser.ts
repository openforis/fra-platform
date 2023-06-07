import { Objects } from 'utils/objects'

import { User, UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const getLastByUser = async (
  props: {
    user: Pick<User, 'id'>
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const {
    user: { id: userId },
  } = props

  return client.oneOrNone<UserResetPassword>(
    `
        select * from public.users_reset_password
        where created_at = (
          select max(created_at)
          from public.users_reset_password
          where user_id = $1
        );
    `,
    [userId],
    Objects.camelize
  )
}
