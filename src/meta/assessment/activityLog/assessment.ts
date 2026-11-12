import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Assessment, AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type AssessmentTargets = {
  [ActivityLogMessage.assessmentCreate]: AssessmentBase
  [ActivityLogMessage.assessmentCycleCreate]: Assessment
  [ActivityLogMessage.assessmentCycleDelete]: Cycle
  [ActivityLogMessage.assessmentCycleRename]: Cycle
}

export type ActivityLogAssessmentCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.assessmentCreate>,
  ActivityLogMessage.assessmentCreate
>

export type ActivityLogCycleCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.assessmentCycleCreate>,
  ActivityLogMessage.assessmentCycleCreate
>

export type ActivityLogCycleDelete = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.assessmentCycleDelete>,
  ActivityLogMessage.assessmentCycleDelete
>

export type ActivityLogCycleRename = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.assessmentCycleRename>,
  ActivityLogMessage.assessmentCycleRename
>
