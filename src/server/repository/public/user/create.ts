import { Objects } from 'utils/objects'

import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/public/user/getOne'

export const create = async (
  props: { user: { email: string; props: Partial<UserProps> } },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    user: { props: userProperties, email },
  } = props

  const { id } = await client.one<User>(
    `
        insert into public.users (email, props) values ($1, $2) returning *;
    `,
    [email, userProperties],
    Objects.camelize
  )

  return getOne({ id }, client)
}
