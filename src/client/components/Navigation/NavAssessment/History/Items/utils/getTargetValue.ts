import { ActivityLogDescriptionUpdate } from 'meta/assessment/activityLog/description'
import { CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { HistoryTarget } from 'meta/cycleData/history/activities'

export const getTargetValue: Record<
  HistoryTarget,
  (activityLog: ActivityLogDescriptionUpdate) => CommentableDescriptionValue
> = {
  dataSources: (activityLog: ActivityLogDescriptionUpdate) => {
    return activityLog?.target.description.value
  },
}
