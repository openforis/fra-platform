import { BaseProtocol, DB } from '@server/db'
import { ActivityLog } from '@core/meta/assessment/activityLog'
import { Objects } from '@core/utils'

export const insertActivityLog = async (
  params: {
    activityLog: ActivityLog<any>
    schemaName: string
  },
  client: BaseProtocol = DB
): Promise<ActivityLog<any>> => {
  const {
    schemaName,
    activityLog: { user, countryIso, message, section, target },
  } = params
  const query = `
    insert into ${schemaName}.activity_log(user_id, country_iso, section, message, target) values ($1, $2, $3, $4, $5::JSONB) returning *;
  `

  return client.one<ActivityLog<any>>(
    query,
    [user.id, countryIso, section, message, JSON.stringify(target)],
    Objects.camelize
  )
}
