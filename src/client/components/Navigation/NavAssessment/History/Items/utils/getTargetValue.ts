import { ActivityLogDescription } from 'meta/assessment/activityLog'
import { CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { HistoryTarget } from 'meta/cycleData/history/activities'

export const getTargetValue: Record<
  HistoryTarget,
  (activityLog: ActivityLogDescription) => CommentableDescriptionValue
> = {
  dataSources: (activityLog: ActivityLogDescription) => {
    return activityLog?.target.description.value
  },
}
