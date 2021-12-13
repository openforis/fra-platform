import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

export const invite = async (props: { user: Pick<User, 'id'> }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { id },
  } = props

  return client.one<User>(
    `
        insert into public.users_invitation (invited_at, accepted_at, user_id) values (now(), NULL, $1) returning *;
    `,
    [id],
    Objects.camelize
  )
}
