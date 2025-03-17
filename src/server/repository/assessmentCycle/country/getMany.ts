import { Objects } from 'utils/objects'

import { Country, CountryIso, RecordCountries } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

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
        select c.country_iso,
               props || jsonb_build_object('status', c.status) as props, 
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
        group by c.country_iso, 
                 props || jsonb_build_object('status', c.status),
                 cs.last_edit,
                 cs.last_in_review,
                 cs.last_for_approval,
                 cs.last_accepted,
                 cs.last_update
        order by c.country_iso
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
