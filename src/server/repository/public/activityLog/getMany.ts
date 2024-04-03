import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: string
  message: ActivityLogMessage
  targetName: string
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<ActivityLog<never>>> => {
  const { assessment, cycle, countryIso, sectionName, message, targetName } = props
  return client.map<ActivityLog<never>>(
    `select * from public.activity_log where assessment_uuid = $1 and cycle_uuid = $2 and country_iso = $3 and section = $4 and message = $5 and target ->> 'name' = $6;`,
    [assessment.uuid, cycle.uuid, countryIso, sectionName, message, targetName],
    (row) => Objects.camelize(row)
  )
}
