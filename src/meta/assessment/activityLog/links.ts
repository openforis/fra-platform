import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'

export type LinksCheckStatus = 'started' | 'completed' | 'failed'

type LinksCheckTarget = { error?: unknown; jobStatus: LinksCheckStatus }

export type LinksTargets = {
  [ActivityLogMessage.linksCheckComplete]: LinksCheckTarget
  [ActivityLogMessage.linksCheckFail]: LinksCheckTarget
  [ActivityLogMessage.linksCheckStart]: LinksCheckTarget
}

export type ActivityLogLinksCheck = ActivityLog<
  LinksCheckTarget,
  ActivityLogMessage.linksCheckComplete | ActivityLogMessage.linksCheckFail | ActivityLogMessage.linksCheckStart
>
