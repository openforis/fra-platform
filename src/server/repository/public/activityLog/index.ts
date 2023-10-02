import { getCycleDataActivities } from './getCycleDataActivities'
import { getCycleDataActivitiesCount } from './getCycleDataActivitiesCount'
import { getLastUpdatedTimestamp } from './getLastUpdatedTimestamp'
import { insertActivityLog } from './insertActivityLog'
import { massiveInsert } from './massiveInsert'

export const ActivityLogRepository = {
  getCycleDataActivitiesCount,
  getCycleDataActivities,
  getLastUpdatedTimestamp,
  insertActivityLog,
  massiveInsert,
}

export type { ActivityLogDb } from './activityLogDb'
