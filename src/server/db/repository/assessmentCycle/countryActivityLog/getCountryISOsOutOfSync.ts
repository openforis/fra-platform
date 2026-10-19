import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { excludeFoldersClause } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/select'
import {
  activitiesLastEdit,
  activitiesLastEditOdpData,
} from 'server/db/repository/assessmentCycle/countrySummary/_lastEditActivities'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
}

type Returned = Array<CountryIso>

export const getCountryISOsOutOfSync = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countries, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
    with al as
      (select al.country_iso
            , max(al.time) filter (where al.message in (${activitiesLastEdit}))         as last_edit
                  , max(al.time) filter (where al.message in (${activitiesLastEditOdpData})) as last_odp_edit
       from activity_log al
       where al.assessment_uuid = $1
         and al.cycle_uuid = $2
         and ${excludeFoldersClause}
       group by al.country_iso)
       , al_country as (
      ${countries.map((country) => {
        const { countryIso } = country
        return `select '${countryIso}' as country_iso, max(time) as last_edit
                from ${schemaCycle}."activity_log_${countryIso}"
                where message in (${activitiesLastEdit})`
      }).join(`
    union
    `)})
    select c.country_iso as countryiso
    from ${schemaCycle}.country c
           left join al on c.country_iso = al.country_iso
           left join al_country alc on c.country_iso = alc.country_iso and al.country_iso = alc.country_iso
    where (alc.last_edit is null and (al.last_edit is not null or al.last_odp_edit is not null))
       or greatest(al.last_edit, al.last_odp_edit) > alc.last_edit
    order by 1 desc
  `

  return client.map<CountryIso>(query, [assessment.uuid, cycle.uuid], (res: { countryiso: CountryIso }) => {
    return res.countryiso
  })
}
