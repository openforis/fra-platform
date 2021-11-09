import { BaseProtocol, DB } from '@server/db'
import { ActivityLog } from '@core/meta/activityLog'

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
  return client.one<ActivityLog<any>>(
    `
    insert into ${schemaName}.activityLog(user_id, country_iso, section, message, target) values ('$1', '$2', '$3', '$4', '$5') returning *;
  `,
    [user.id, countryIso, section, message, target]
  )
}
