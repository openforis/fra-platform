import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

const fields: Array<string> = ['lang', 'id', 'name', 'status', 'position', 'email']

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getOne = async (
  props: { user: Pick<User, 'email'> | Pick<User, 'id'>; emailGoogle?: string },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, emailGoogle } = props

  const value = 'email' in user ? user.email : +user.id
  const where = 'email' in user ? `where lower(trim(u.email)) = trim(lower($1))` : `where u.id = $1`
  const whereGoogle = `where u.id = (select user_id from public.users_auth_provider where props->>'email' = $1)`

  return client.oneOrNone<User>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
        left join users_role ur on u.id = ur.user_id
        ${emailGoogle ? whereGoogle : where}
        group by ${selectFields}
    `,
    emailGoogle ? [emailGoogle] : [value],
    Objects.camelize
  )
}
