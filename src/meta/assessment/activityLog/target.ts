import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { MetadataTargets } from 'meta/assessment/activityLog/metadata'
import { NationalDataPointTargets } from 'meta/assessment/activityLog/nationalDataPoint'

// ActivityLog target type mapped by message
// TODO: This will contains all AcitivityLogTargets
export type ActivityLogTargets = NationalDataPointTargets & MetadataTargets

// Messages not mapped yet have an unknown target
export type ActivityLogTarget<Message extends ActivityLogMessage> = Message extends keyof ActivityLogTargets
  ? ActivityLogTargets[Message]
  : unknown
