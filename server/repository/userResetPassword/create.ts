import { BaseProtocol, DB } from '@server/db'
import { User, UserResetPassword } from '@meta/user'

import { Objects } from '@core/utils'

export const create = async (
  props: { user: Pick<User, 'id'> },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const {
    user: { id: userId },
  } = props

  return client.one(`insert into users_reset_password (user_id) values ($1) returning *;`, [userId], Objects.camelize)
}
