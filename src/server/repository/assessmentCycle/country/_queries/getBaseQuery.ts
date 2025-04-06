import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
}

export const getBaseQuery = (props: Props): string => {
  const { assessment, cycle, countryIso } = props
  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return `
    select c.country_iso,
           props || jsonb_build_object('status', c.status) as props, 
           c.last_edit,
           c.last_in_review,
           c.last_in_approval,
           c.last_in_accepted,
           c.last_update,
           jsonb_agg(cr.region_code) as region_codes
    from ${cycleSchema}.country c
             left join ${cycleSchema}.country_region cr
                       on c.country_iso = cr.country_iso
             left join ${cycleSchema}.country_summary cs
                       on c.country_iso = cs.country_iso
    ${countryIso ? 'where c.country_iso = $1' : ''}
    group by c.country_iso, 
             props || jsonb_build_object('status', c.status),
            c.last_edit,
            c.last_in_review,
            c.last_in_approval,
            c.last_in_accepted,
            c.last_update
  `
}
