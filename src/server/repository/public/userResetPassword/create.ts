import { Objects } from 'utils/objects'

import { User, UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const create = async (
  props: {
    user: Pick<User, 'id'>
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const {
    user: { id: userId },
  } = props

  await client.none(`update public.users_reset_password set active = false where user_id = $1;`, [userId])

  return client.one(
    `insert into public.users_reset_password (user_id) values ($1) returning *;`,
    [userId],
    Objects.camelize
  )
}
