import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Message } from 'meta/messageCenter/message'
import { MessageTopic } from 'meta/messageCenter/messageTopic'

export type MessageCenterTargets = {
  [ActivityLogMessage.messageCreate]: Pick<Message, 'id' | 'topicUuid'>
  [ActivityLogMessage.messageMarkDeleted]: Pick<Message, 'id' | 'topicUuid'>
  [ActivityLogMessage.topicStatusChange]: MessageTopic
}

export type ActivityLogMessageCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.messageCreate>,
  ActivityLogMessage.messageCreate
>

export type ActivityLogMessageMarkDeleted = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.messageMarkDeleted>,
  ActivityLogMessage.messageMarkDeleted
>

export type ActivityLogTopicStatusChange = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.topicStatusChange>,
  ActivityLogMessage.topicStatusChange
>
