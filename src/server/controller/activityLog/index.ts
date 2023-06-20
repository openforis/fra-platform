import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const ActivityLogController = {
  getLastUpdatedTimestamp: ActivityLogRepository.getLastUpdatedTimestamp,
}
