import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

const fields: Array<string> = ['lang', 'id', 'name', 'status', 'position', 'email']

const selectFields = fields.map((f) => `u.${f}`).join(',')

// TODO: pass props: Pick<User, 'email'>  | Pick<User, 'id'> | {emailGoogle:string}
// TODO: rename method getOneOrNone - check if you can use getOne
// TODO: insert in user auth provider google email during invitation
// TODO: when passing emailGoogle, left join with users_auth_provider and where condition becomes props->>'email' = $1

export const read = async (
  props: { user: Pick<User, 'email'> } | { user: Pick<User, 'id'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  const value = 'email' in user ? user.email : +user.id
  const where = 'email' in user ? `where lower(trim(u.email)) = trim(lower($1))` : `where u.id = $1`

  return client.oneOrNone<User>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
                 left join users_role ur on u.id = ur.user_id
        ${where}
        group by ${selectFields}
    `,
    [value],
    Objects.camelize
  )
}
