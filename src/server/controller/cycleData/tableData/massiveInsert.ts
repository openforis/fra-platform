import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, Node, RowCache, RowCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol, DB } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/repository/public/activityLog'
import { DataRedisRepository } from 'server/repository/redis/data'
import { RowRedisRepository } from 'server/repository/redis/row'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryNodes: { [key in CountryIso]?: Array<NodeUpdate> }
  nodes: Array<NodeDb>
  user: User
}

export const _updateDependencies = async (
  props: Pick<Props, 'assessment' | 'cycle' | 'countryNodes'>,
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, cycle, countryNodes } = props
  const allNodesDb: Array<NodeDb> = []
  const allNodes: Array<{ nodes: Record<string, Array<NodeUpdate>>; countryIso: CountryIso }> = []

  const _execJob = async (props: { countryIso: CountryIso; nodes: Array<NodeUpdate> }): Promise<void> => {
    const { countryIso, nodes } = props
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    const contextProps = { assessment, cycle, nodeUpdates, includeSourceNodes: false }
    const context = await ContextFactory.newInstance(contextProps, client)
    const result = updateCalculationDependencies({ context, jobId: `massive_insert-${Date.now()}` })

    if (result.nodesDb.length > 0) {
      allNodesDb.push(...result.nodesDb)
      allNodes.push({ nodes: result.nodes, countryIso })
    }
  }

  await Promise.all(
    Object.entries(countryNodes).map(([countryIso, nodes]: [CountryIso, Array<NodeUpdate>]) =>
      _execJob({ countryIso, nodes })
    )
  )

  try {
    if (allNodesDb.length > 0) {
      await NodeRepository.massiveInsert({ assessment, cycle, nodes: allNodesDb }, client)
      await Promise.all(
        allNodes.map(async ({ countryIso, nodes }) => {
          await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
        })
      )
    }
  } catch (e) {
    Logger.error('Persisting nodes failed')
    Logger.error(e)
  }
}

export const massiveInsert = async (props: Props): Promise<void> => {
  const { assessment, cycle, nodes, countryNodes, user } = props
  const rows = await RowRedisRepository.getRows({ assessment })
  const rowsByRowUuid: Record<string, RowCache> = {}

  await DB.tx(async (client) => {
    // Insert nodes
    const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes }, client)

    // Update cache and insert activity log for each country
    await Promise.all(
      Object.entries(countryNodes).map(async ([countryIso, nodes]) => {
        const nodesByTable = nodes.reduce<Record<string, NodeUpdate[]>>((acc, node) => {
          const { tableName, variableName } = node
          if (!acc[tableName]) acc[tableName] = []
          acc[tableName].push(node)

          const rowKey = RowCaches.getKey({ tableName, variableName })
          const row = rows[rowKey]
          rowsByRowUuid[row.uuid] = row

          return acc
        }, {})

        await DataRedisRepository.updateNodes({
          assessment,
          cycle,
          countryIso: countryIso as CountryIso,
          nodes: nodesByTable,
        })

        // 2. Insert activity logs into DB
        const activityLogs = nodesInsert.map<ActivityLogDb<Node>>((target: Node) => {
          const section = rowsByRowUuid[target.rowUuid]?.sectionName
          return {
            assessment_uuid: assessment.uuid,
            cycle_uuid: cycle.uuid,
            country_iso: countryIso,
            section,
            message: ActivityLogMessage.nodeValueImport,
            target,
            user_id: user.id,
          }
        })
        await ActivityLogRepository.massiveInsert({ activityLogs }, client)
      })
    )

    // Update Deps
    await _updateDependencies({ assessment, cycle, countryNodes })
  })
}
