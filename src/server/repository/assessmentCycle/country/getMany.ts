import { Objects } from 'utils/objects'

import { Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { isAtlantisAllowed } from 'server/repository/assessmentCycle/country/isAtlantisAllowed'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Country>> => {
  const { assessment, cycle } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  let atlantis = ''
  if (!isAtlantisAllowed(assessment, cycle)) {
    atlantis = `where c.country_iso not like 'X%'`
  }

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
                               ${atlantis}
        group by 1, 2, 3, 4, 5, 6, 7
        order by 1
    `,
    [cycle.uuid],
    // @ts-ignore
    Objects.camelize
  )
}
