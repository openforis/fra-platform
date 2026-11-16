import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { FileSummary } from 'meta/file/file'

export type FileTargets = {
  [ActivityLogMessage.fileCreate]: { fileName: FileSummary['name']; uuid: FileSummary['uuid'] }
}

export type ActivityLogFileCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.fileCreate>,
  ActivityLogMessage.fileCreate
>
