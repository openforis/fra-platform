import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { AssessmentTargets } from 'meta/assessment/activityLog/assessment'
import { ContactTargets } from 'meta/assessment/activityLog/contact'
import { DescriptionTargets } from 'meta/assessment/activityLog/description'
import { FileTargets } from 'meta/assessment/activityLog/file'
import { LinksTargets } from 'meta/assessment/activityLog/links'
import { MessageCenterTargets } from 'meta/assessment/activityLog/messageCenter'
import { MetadataTargets } from 'meta/assessment/activityLog/metadata'
import { NationalDataPointTargets } from 'meta/assessment/activityLog/nationalDataPoint'
import { RepositoryTargets } from 'meta/assessment/activityLog/repository'
import { UserTargets } from 'meta/assessment/activityLog/user'

// ActivityLog target type mapped by message
export type ActivityLogTargets = NationalDataPointTargets &
  MetadataTargets &
  AssessmentTargets &
  ContactTargets &
  RepositoryTargets &
  MessageCenterTargets &
  UserTargets &
  FileTargets &
  LinksTargets &
  DescriptionTargets

// Messages not mapped yet have an unknown target
export type ActivityLogTarget<Message extends ActivityLogMessage> = Message extends keyof ActivityLogTargets
  ? ActivityLogTargets[Message]
  : unknown
