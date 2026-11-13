import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { RepositoryItem } from 'meta/cycleData/repository/item'

export type RepositoryTargets = {
  [ActivityLogMessage.repositoryItemCreate]: RepositoryItem
  [ActivityLogMessage.repositoryItemDelete]: RepositoryItem
  [ActivityLogMessage.repositoryItemUpdate]: RepositoryItem
}

export type ActivityLogRepositoryItemCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.repositoryItemCreate>,
  ActivityLogMessage.repositoryItemCreate
>

export type ActivityLogRepositoryItemDelete = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.repositoryItemDelete>,
  ActivityLogMessage.repositoryItemDelete
>

export type ActivityLogRepositoryItemUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.repositoryItemUpdate>,
  ActivityLogMessage.repositoryItemUpdate
>
