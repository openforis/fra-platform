import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, Node, RowCache, RowCaches } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'
import { User } from 'meta/user'

import { DB } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/repository/public/activityLog'
import { DataRedisRepository } from 'server/repository/redis/data'
import { RowRedisRepository } from 'server/repository/redis/row'

import { updateTableDataDependencies } from './updateTableDataDependencies'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryNodes: { [key in CountryIso]?: Array<NodeUpdate> }
  nodes: Array<NodeDb>
  user: User
}

export const massiveInsert = async (props: Props): Promise<void> => {
  const { assessment, cycle, nodes, countryNodes, user } = props
  const rows = await RowRedisRepository.getRows({ assessment })
  const rowsByRowUuid: Record<string, RowCache> = {}

  await DB.tx(async (client) => {
    // 1. Insert nodes into DB
    const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes }, client)

    // 2. Update cache and insert activity log for each country
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

        // 3. Update Redis cache for each affected table
        await Promise.all(
          Object.keys(nodesByTable).map(async (tableName) => {
            await DataRedisRepository.cacheCountryTable({
              assessment,
              cycle,
              countryIso: countryIso as CountryIso,
              tableName,
              force: true,
            })
          })
        )

        // 4. Insert activity logs into DB
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

    // 5.Update Deps
    await updateTableDataDependencies({ assessment, cycle, countryNodes })
  })
}
