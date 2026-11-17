import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { CommentableDescription } from 'meta/assessment/descriptionValue'

export type DescriptionTargets = {
  // value is wrapped in object:
  // last approved descriptions read:
  // target -> 'description' -> 'value'
  [ActivityLogMessage.descriptionUpdate]: {
    description: Pick<CommentableDescription, 'value'>
    name: CommentableDescription['name']
  }
}

export type ActivityLogDescriptionUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.descriptionUpdate>,
  ActivityLogMessage.descriptionUpdate
>
