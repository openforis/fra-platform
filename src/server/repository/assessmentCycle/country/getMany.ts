import { Objects } from 'utils/objects'

import { Country, CountryIso, RecordCountries } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.map<Country>(
    `
        select c.*,
               cs.last_edit,
               cs.last_in_review,
               cs.last_for_approval,
               cs.last_accepted,
               cs.last_update,
               jsonb_agg(cr.region_code) as region_codes
        from ${cycleSchema}.country c
                 left join ${cycleSchema}.country_region cr
                           on c.country_iso = cr.country_iso
                 left join ${cycleSchema}.country_summary cs
                           on c.country_iso = cs.country_iso
        group by 1, 2, 3, 4, 5, 6, 7
        order by 1
    `,
    [cycle.uuid],
    (row) => Objects.camelize(row)
  )
}

export const getManyRecord = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountries> => {
  const countries = await getMany(props, client)

  return countries.reduce<RecordCountries>(
    (acc, country) => ({ ...acc, [country.countryIso]: country }),
    {} as Record<CountryIso, Country>
  )
}
