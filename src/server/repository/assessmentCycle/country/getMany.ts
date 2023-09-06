import { Objects } from 'utils/objects'

import { Country } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { isAtlantisAllowed } from 'server/repository/assessmentCycle/country/isAtlantisAllowed'

export const activityLogMessageUpdates = [
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.nodeValueCalculatedUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.tableValuesClear,
]
  .map((a) => `'${a}'`)
  .join(',')

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
        with last_edit as (
            select a.country_iso, max(a.time) as last_edit
            from public.activity_log a
            where a.cycle_uuid = $1
                and a.message in (${activityLogMessageUpdates})
            group by 1
        )
        select c.*,
               le.last_edit,
               jsonb_agg(cr.region_code)                                     as region_codes
        from ${cycleSchema}.country c
                 left join ${cycleSchema}.country_region cr
                           on c.country_iso = cr.country_iso
                 left join last_edit le
                           on c.country_iso = le.country_iso
        ${atlantis}
        group by 1, 2, 3
        order by 1
    `,
    [cycle.uuid],
    // @ts-ignore
    Objects.camelize
  )
}
