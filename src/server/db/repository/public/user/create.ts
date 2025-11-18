import { User, UserProps } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserAdapter } from 'server/db/repository/adapter/user'
import { getOne } from 'server/db/repository/public/user/getOne'

export const create = async (
  props: { user: { email: string; props: Partial<UserProps> } },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    user: { email, props: userProperties },
  } = props

  const { id } = await client.one<User>(
    `
        insert into public.users (email, props) values ($1, $2) returning *;
    `,
    [email, userProperties],
    UserAdapter
  )

  return getOne({ id }, client)
}
