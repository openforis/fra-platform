import { insertActivityLog } from './insertActivityLog'
import { massiveInsert } from './massiveInsert'

export const ActivityLogRepository = {
  insertActivityLog,
  massiveInsert,
}

export type { ActivityLogDb } from './activityLogDb'
