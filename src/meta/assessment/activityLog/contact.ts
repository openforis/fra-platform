import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { ContactProps } from 'meta/cycleData/contact/contact'
import { ContactNode } from 'meta/cycleData/contact/node'
import { NodeExt } from 'meta/nodeExt/nodeExt'

// create and delete log the contact row only, without its child nodes
export type ContactTargets = {
  [ActivityLogMessage.contactCreate]: NodeExt<ContactProps, null>
  [ActivityLogMessage.contactDelete]: NodeExt<ContactProps, null>
  [ActivityLogMessage.contactUpdate]: ContactNode
}

export type ActivityLogContactCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.contactCreate>,
  ActivityLogMessage.contactCreate
>

export type ActivityLogContactDelete = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.contactDelete>,
  ActivityLogMessage.contactDelete
>

export type ActivityLogContactUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.contactUpdate>,
  ActivityLogMessage.contactUpdate
>
