import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { Node } from 'meta/assessment/node'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'

export type TableDataTargets = {
  [ActivityLogMessage.nodeValueCalculatedUpdate]: Node
  [ActivityLogMessage.nodeValueEstimate]: Node
  [ActivityLogMessage.nodeValueImport]: Node
  [ActivityLogMessage.nodeValuesEstimationCreate]: NodeValuesEstimation
  [ActivityLogMessage.nodeValueUpdate]: Node
  [ActivityLogMessage.tableValuesClear]: { nodes: Array<NodeUpdate>; tableName: TableName }
}

type NodeValueMessage = ActivityLogMessage.nodeValueEstimate | ActivityLogMessage.nodeValueUpdate

export type ActivityLogNodeValue = ActivityLog<ActivityLogTarget<NodeValueMessage>, NodeValueMessage>

export type ActivityLogNodeValuesEstimationCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.nodeValuesEstimationCreate>,
  ActivityLogMessage.nodeValuesEstimationCreate
>

export type ActivityLogTableValuesClear = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.tableValuesClear>,
  ActivityLogMessage.tableValuesClear
>
