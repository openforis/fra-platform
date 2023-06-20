import { getCycleDataActivities } from './getCycleDataActivities'
import { getLastUpdatedTimestamp } from './getLastUpdatedTimestamp'
import { insertActivityLog } from './insertActivityLog'

export const ActivityLogRepository = {
  getCycleDataActivities,
  getLastUpdatedTimestamp,
  insertActivityLog,
}
