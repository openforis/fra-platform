import { BaseProtocol, DB } from '@server/db'
import { User, UserInvitation } from '@core/meta/user'
import { Objects } from '@core/utils'

export const create = async (props: { user: Pick<User, 'id'> }, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const {
    user: { id },
  } = props

  return client.one<UserInvitation>(
    `
        insert into public.users_invitation (invited_at, accepted_at, user_id) values (now(), NULL, $1) returning *;
    `,
    [id],
    Objects.camelize
  )
}
