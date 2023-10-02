import { getCycleDataActivities } from './getCycleDataActivities'
import { getLastUpdatedTimestamp } from './getLastUpdatedTimestamp'
import { insertActivityLog } from './insertActivityLog'
import { massiveInsert } from './massiveInsert'

export const ActivityLogRepository = {
  getCycleDataActivities,
  getLastUpdatedTimestamp,
  insertActivityLog,
  massiveInsert,
}

export type { ActivityLogDb } from './activityLogDb'
