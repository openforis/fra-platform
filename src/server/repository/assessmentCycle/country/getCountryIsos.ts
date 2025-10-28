import { CountryIso, RegionCode } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  regionCode?: RegionCode
}

export const getCountryIsos = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountryIso>> => {
  const { assessment, cycle, regionCode } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  let where = ''
  if (regionCode)
    where = `and country_iso in (select country_iso from ${schemaCycle}.country_region where region_code = $1)`

  return client.map(
    `
      select country_iso
      from ${schemaCycle}.country
      where country_iso not ilike 'X%' ${where}
      order by 1
  `,
    [regionCode],
    (row) => row.country_iso
  )
}
