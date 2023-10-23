import { Objects } from 'utils/objects'

import { User, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

import { fields } from './fields'

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
      `u.id = (
      select user_id from public.users_auth_provider
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

  return client
    .oneOrNone<User>(
      `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
        left join users_role ur on u.id = ur.user_id and (ur.accepted_at is not null or ur.invited_at is null or ur.role = 'ADMINISTRATOR') ${join}
        where ${where.join(' ')}
        group by ${selectFields}
    `,
      values
    )
    .then((data) => {
      if (!data) return null
      return {
        ...Objects.camelize(data),
        roles: (data.roles[0] !== null ? data.roles : []).map(UserRoleAdapter),
      }
    })
}
