import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { User, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

const userRolesSubquery = `
  select ur_sub.*
  from users_role ur_sub
  left join public.assessment_cycle c on ur_sub.cycle_uuid = c.uuid
  where (
    -- 1. Allow admin roles always (they have null country_iso and cycle_uuid)
    ur_sub.country_iso is null
    and ur_sub.cycle_uuid is null
    and ur_sub.role = 'ADMINISTRATOR'

    -- 2. Allow non-Atlantis countries always
    or ur_sub.country_iso not like '${Areas.ATLANTIS_PREFIX}%'

    -- 3. Allow Atlantis countries only if cycle is not published
    or (
      ur_sub.country_iso like '${Areas.ATLANTIS_PREFIX}%'
      and c.props->>'status' != 'published'
    )
  )
`

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
        left join (${userRolesSubquery}) ur on u.uuid = ur.user_uuid ${join}
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
