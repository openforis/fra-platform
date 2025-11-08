import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UsersGetManyProps } from 'server/db/repository/public/user/usersGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/public/user/utils/getPropsToQueryParams'
import { Schemas } from 'server/db/schemas'

type Returned = Record<RoleName | 'total', number>

export const count = async (props: UsersGetManyProps, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  // Exclude atlantis countries from the count when not explicitly filtering for atlantis
  if (!queryParams.countries?.every((countryIso: CountryIso) => Areas.isAtlantis(countryIso)))
    whereConditions.push(`(cus.country_iso is null or cus.country_iso not like 'X%')`)

  const queryRoles = `
      with filtered_users as
               (select distinct uuid
                from ${schemaName}.country_user_summary cus
                where ${whereConditions.join(' and ')}),
           counts as
               (select count(distinct (id)) as totals, coalesce(role ->> 'role', invitation ->> 'role') as role
                from ${schemaName}.country_user_summary cus
                where ${whereConditions.join(' and ')}
                group by coalesce(role ->> 'role', invitation ->> 'role')
                union all
                -- add row "total" that describes the total count of unique users
                select count(uuid) as total, 'total' as role
                from filtered_users)
      select jsonb_object_agg(counts.role, counts.totals) as result
      from counts`

  return client.one<Returned>(queryRoles, queryParams, ({ result }) => result)
}
