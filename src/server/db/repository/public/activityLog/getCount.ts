import { AreaCode } from 'meta/area/areaCode'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedCount } from 'meta/tablePaginated/count'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: string
  message: ActivityLogMessage
  target: string
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, countryIso, cycle, message, sectionName, target } = props

  return client.one<TablePaginatedCount>(
    `select count(al.id) as total
     from public.activity_log al
     where assessment_uuid = $1
       and cycle_uuid = $2
       and country_iso = $3
       and section = $4
       and message = $5
       and target ->> 'name' = $6
    `,
    [assessment.uuid, cycle.uuid, countryIso, sectionName, message, target]
  )
}
