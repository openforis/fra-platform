import { getCount } from 'server/db/repository/public/activityLog/getCount'
import { getLastLinksCheckCompleteTime } from 'server/db/repository/public/activityLog/getLastLinksCheckCompleteTime'
import { getMany } from 'server/db/repository/public/activityLog/getMany'
import { insertActivityLog } from 'server/db/repository/public/activityLog/insertActivityLog'
import { massiveInsert } from 'server/db/repository/public/activityLog/massiveInsert'

export const ActivityLogRepository = {
  getCount,
  getLastLinksCheckCompleteTime,
  getMany,
  insertActivityLog,
  massiveInsert,
}

export type { ActivityLogDb } from 'server/db/repository/public/activityLog/activityLogDb'
