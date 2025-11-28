import { User, UserStatus } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserAdapter } from 'server/db/repository/adapter/user'
import { fields } from 'server/db/repository/public/user/fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

type Props = ({ id: number } | { uuid: string } | { email: string } | { emailGoogle: string }) & {
  allowDisabled?: boolean
  cycleUuid?: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { allowDisabled } = props
  const where = []
  let join = ''
  const values = []

  if ('id' in props) {
    where.push('u.id = $1')
    values.push(String(props.id))
  } else if ('uuid' in props) {
    where.push('u.uuid = $1')
    values.push(String(props.uuid))
  } else if ('email' in props) {
    where.push('lower(trim(u.email)) = trim(lower($1))')
    values.push(props.email)
  } else if ('emailGoogle' in props) {
    where.push(
      `u.uuid = (
      select user_uuid from public.users_auth_provider
      where
      regexp_replace(props->>'email', '(?<!@gmail)\\.', '', 'g') = regexp_replace($1, '(?<!@gmail)\\.', '', 'g'))`
    )
    values.push(props.emailGoogle)
  } else {
    throw new Error('Missing parameter')
  }

  if (props.cycleUuid) {
    join = 'and (ur.cycle_uuid = $2 or ur.cycle_uuid is null)'
    values.push(props.cycleUuid)
  }

  if (!allowDisabled) {
    const allowed = [UserStatus.active, UserStatus.invitationPending]
    where.push(`and u.status in (${allowed.map((status) => `'${status}'`).join(',')})`)
  }

  const query = `
    select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) filter ( where ur.uuid is not null ) as roles
    from public.users u
           left join users_role ur on u.uuid = ur.user_uuid ${join}
    where ${where.join(' ')}
    group by ${selectFields}
  `
  return client.oneOrNone<User>(query, values, UserAdapter)
}
