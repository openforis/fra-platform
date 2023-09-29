import { getCycleDataActivities } from './getCycleDataActivities'
import { getCycleDataActivitiesCount } from './getCycleDataActivitiesCount'
import { getLastUpdatedTimestamp } from './getLastUpdatedTimestamp'
import { insertActivityLog } from './insertActivityLog'

export const ActivityLogRepository = {
  getCycleDataActivitiesCount,
  getCycleDataActivities,
  getLastUpdatedTimestamp,
  insertActivityLog,
}
