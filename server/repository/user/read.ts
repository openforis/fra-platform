import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user'
import { Objects } from '@core/utils'

// TODO: handle selection by id
export const read = async (props: { user: Pick<User, 'email'> }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { email },
  } = props

  return client.one<User>(
    `
        select * from public.users where email = $1;
    `,
    [email],
    Objects.camelize
  )
}
