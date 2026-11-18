import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Node } from 'meta/assessment/node'

export type TableDataTargets = {
  [ActivityLogMessage.nodeValueCalculatedUpdate]: Node
  [ActivityLogMessage.nodeValueEstimate]: Node
  [ActivityLogMessage.nodeValueUpdate]: Node
}

type NodeValueMessage = ActivityLogMessage.nodeValueEstimate | ActivityLogMessage.nodeValueUpdate

export type ActivityLogNodeValue = ActivityLog<ActivityLogTarget<NodeValueMessage>, NodeValueMessage>
