import { CountryIso } from '@meta/area'
import { RoleName } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const count = async (
  props: {
    countries?: Array<CountryIso>
    roles?: Array<RoleName>
  },
  client: BaseProtocol = DB
): Promise<{ totals: number }> => {
  const { countries, roles } = props

  const selectedCountries = countries.map((countryIso) => `'${countryIso}'`).join(',')

  const selectedRoles = roles.map((roleName) => `'${roleName}'`).join(',')

  let query = `
    select count(distinct(u.id)) as totals from public.users u
      join public.users_role ur on (u.id = ur.user_id)
    where true
    ${selectedCountries ? `and ur.country_iso in (${selectedCountries})` : ''}
    ${selectedRoles ? `and ur.role in (${selectedRoles})` : ''}
  `

  const totals = await client.one<{ totals: number }>(query)

  query = `
    select role, count(*) as totals from public.users_role ur
    where true
    ${selectedCountries ? `and ur.country_iso in (${selectedCountries})` : ''}
    ${selectedRoles ? `and ur.role in (${selectedRoles})` : ''}    
    group by role
  `

  const roleTotals = await client.result<Record<string, Array<{ role: RoleName; totals: number }>>>(
    query,
    [],
    (result) => result.rows.reduce((prev, current) => ({ ...prev, [current.role]: current.totals }), {})
  )

  return { ...totals, ...roleTotals }
}
