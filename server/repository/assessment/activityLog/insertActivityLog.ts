import { Objects } from '@utils/objects'

import { ActivityLog, Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const insertActivityLog = async (
  params: {
    activityLog: ActivityLog<any>
    assessment: Assessment
    cycle?: Cycle
  },
  client: BaseProtocol = DB
): Promise<ActivityLog<any>> => {
  const {
    assessment,
    cycle,
    activityLog: { user, countryIso, message, section, target },
  } = params
  const schemaName = Schemas.getName(assessment)

  const query = `
    insert into ${schemaName}.activity_log(user_id, country_iso, section, message, target, cycle_uuid) values ($1, $2, $3, $4, $5::JSONB, $6) returning *;
  `

  return client.one<ActivityLog<any>>(
    query,
    [user.id, countryIso, section, message, JSON.stringify(target), cycle ? cycle.uuid : null],
    Objects.camelize
  )
}
