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
  target: string
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<ActivityLog<never>>> => {
  const { assessment, cycle, countryIso, sectionName, message, target } = props
  return client.map<ActivityLog<never>>(
    `select al.*,
                  jsonb_build_object('id', u.id, 'props', u.props) as user
          from public.activity_log al
          join public.users u on al.user_id = u.id
          where assessment_uuid = $1 and cycle_uuid = $2 and country_iso = $3 and section = $4 and message = $5 and target ->> 'name' = $6;`,
    [assessment.uuid, cycle.uuid, countryIso, sectionName, message, target],
    (row) => Objects.camelize(row)
  )
}
