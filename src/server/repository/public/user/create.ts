import { Objects } from '@utils/objects'

import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { getOne } from '@server/repository/public/user/getOne'

export const create = async (
  props: { user: Pick<User, 'name' | 'email'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    user: { name, email },
  } = props

  const { id } = await client.one<User>(
    `
        insert into public.users (name, email) values ($1, $2) returning *;
    `,
    [name, email],
    Objects.camelize
  )

  return getOne({ id })
}
