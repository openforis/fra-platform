import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

// TODO: handle selection by id
export const remove = async (props: { user: Pick<User, 'email'> }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { email },
  } = props

  return client.one<User>(
    `
        delete from public.users where email = $1 returning *;
    `,
    [email],
    Objects.camelize
  )
}
