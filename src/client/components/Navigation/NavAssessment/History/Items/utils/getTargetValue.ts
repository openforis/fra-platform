import { ActivityLogDescription, CommentableDescriptionValue } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

export const getTargetValue: Record<
  HistoryTarget,
  (activityLog: ActivityLogDescription) => CommentableDescriptionValue
> = {
  dataSources: (activityLog: ActivityLogDescription) => {
    return activityLog?.target.description.value
  },
}
