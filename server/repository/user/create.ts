import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user'
import { Objects } from '@core/utils'

export const create = async (
  props: { user: Pick<User, 'name' | 'email'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    user: { name, email },
  } = props

  return client.one<User>(
    `
        insert into public.users (name, email) values ($1, $2) returning *;
    `,
    [name, email],
    Objects.camelize
  )
}
