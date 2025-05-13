import { Objects } from 'utils/objects'

import { ActivityLog } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'

export const insertActivityLog = async (
  params: {
    activityLog: ActivityLog<any>
    assessment?: Assessment
    cycle?: Cycle
  },
  client: BaseProtocol = DB
): Promise<ActivityLog<any>> => {
  const {
    activityLog: { countryIso, message, section, target, user },
    assessment,
    cycle,
  } = params

  const query = `
    insert into public.activity_log(user_id, country_iso, section, message, target, assessment_uuid, cycle_uuid) values ($1, $2, $3, $4, $5::JSONB, $6, $7) returning *;
  `

  return client.one<ActivityLog<any>>(
    query,
    [
      user.id,
      countryIso,
      section,
      message,
      JSON.stringify(target),
      assessment ? assessment.uuid : null,
      cycle ? cycle.uuid : null,
    ],
    Objects.camelize
  )
}
