import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Node } from 'meta/assessment/node'

export type TableDataTargets = {
  [ActivityLogMessage.nodeValueUpdate]: Node
}
