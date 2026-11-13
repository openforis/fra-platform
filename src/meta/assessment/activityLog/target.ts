import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { AssessmentTargets } from 'meta/assessment/activityLog/assessment'
import { ContactTargets } from 'meta/assessment/activityLog/contact'
import { MessageCenterTargets } from 'meta/assessment/activityLog/messageCenter'
import { MetadataTargets } from 'meta/assessment/activityLog/metadata'
import { NationalDataPointTargets } from 'meta/assessment/activityLog/nationalDataPoint'
import { RepositoryTargets } from 'meta/assessment/activityLog/repository'

// ActivityLog target type mapped by message
export type ActivityLogTargets = NationalDataPointTargets &
  MetadataTargets &
  AssessmentTargets &
  ContactTargets &
  RepositoryTargets &
  MessageCenterTargets

// Messages not mapped yet have an unknown target
export type ActivityLogTarget<Message extends ActivityLogMessage> = Message extends keyof ActivityLogTargets
  ? ActivityLogTargets[Message]
  : unknown
