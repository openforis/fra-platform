import { getCount } from './getCount'
import { getMany } from './getMany'
import { insertActivityLog } from './insertActivityLog'
import { massiveInsert } from './massiveInsert'

export const ActivityLogRepository = {
  getCount,
  getMany,
  insertActivityLog,
  massiveInsert,
}

export type { ActivityLogDb } from './activityLogDb'
