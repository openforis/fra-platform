import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Link } from 'meta/cycleData/links/link'

export type LinksCheckStatus = 'started' | 'completed' | 'failed'

type LinksCheckTarget = { error?: string; jobStatus: LinksCheckStatus }

export type LinksTargets = {
  [ActivityLogMessage.linksCheckComplete]: LinksCheckTarget
  [ActivityLogMessage.linksCheckFail]: LinksCheckTarget
  [ActivityLogMessage.linksCheckStart]: LinksCheckTarget
  [ActivityLogMessage.linkUpdate]: Pick<Link, 'id' | 'link' | 'props' | 'uuid'>
}

export type ActivityLogLinksCheck = ActivityLog<
  LinksCheckTarget,
  ActivityLogMessage.linksCheckComplete | ActivityLogMessage.linksCheckFail | ActivityLogMessage.linksCheckStart
>

export type ActivityLogLinkUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.linkUpdate>,
  ActivityLogMessage.linkUpdate
>
