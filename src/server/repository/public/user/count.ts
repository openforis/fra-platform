import { RoleName } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getPropsToQueryParams } from './utils/getPropsToQueryParams'
import { UsersGetManyProps } from './usersGetManyProps'

type Returned = Record<RoleName | 'total', number>

export const count = async (props: UsersGetManyProps, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const queryRoles = `
      with filtered_users as (
          select distinct uuid
          from ${schemaName}.country_user_summary cus
          where ${whereConditions.join(' and ')}
      ),
         counts as (
      select count(distinct (id)) as totals, coalesce(role ->> 'role', invitation ->> 'role') as role
      from filtered_users u
      left join ${schemaName}.country_user_summary using (uuid)
      group by coalesce(role ->> 'role', invitation ->> 'role')
      union all
      -- add row "total" that describes the total count of unique users
      select count(uuid) as total, 'total' as role from filtered_users
    )
    select jsonb_object_agg(counts.role, counts.totals) as result
    from counts`

  return client.one<Returned>(queryRoles, queryParams, ({ result }) => result)
}
