import { ActivityLogDescription, CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

export const getTargetValue: {
  [key in CommentableDescriptionName]?: (activityLog: ActivityLogDescription) => CommentableDescriptionValue
} = {
  dataSources: (activityLog: ActivityLogDescription) => {
    return activityLog?.target.description.value
  },
}
