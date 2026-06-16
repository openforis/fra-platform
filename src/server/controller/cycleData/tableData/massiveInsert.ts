import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Node } from 'meta/assessment/node'
import { RowCache } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'
import { Promises } from 'utils/promises'

import { DataRedisRepository } from 'server/cache/repository/data'
import { RowRedisRepository } from 'server/cache/repository/row'
import { updateDependencies } from 'server/controller/cycleData/tableData/updateDependencies/updateDependencies'
import { DB } from 'server/db/db'
import { NodeDb, NodeRepository } from 'server/db/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  countryNodes: { [key in CountryIso]?: Array<NodeUpdate> }
  user: User
}

export const massiveInsert = async (props: Props): Promise<void> => {
  const { assessment, country, countryNodes, cycle, user } = props
  const { uuid: assessmentUuid } = assessment
  const { uuid: cycleUuid } = cycle

  const rows = await RowRedisRepository.getRows({ assessment })

  await DB.tx(async (client) => {
    // For each country
    await Promises.each(Object.entries(countryNodes), async ([_countryIso, nodes]) => {
      const countryIso = _countryIso as CountryIso
      const tableNames = new Set<TableName>()
      const rowsByRowUuid: Record<string, RowCache> = {}

      // 1. create nodes db
      const nodesDb = nodes.map<NodeDb>((node) => {
        const { colName, tableName, variableName } = node
        const rowKey = RowCaches.getKey({ tableName, variableName })
        const row = rows[rowKey]
        const col = row.cols.find((c) => c.props.colName === colName)
        tableNames.add(tableName)
        rowsByRowUuid[row.uuid] = row
        return { country_iso: countryIso, col_uuid: col.uuid, row_uuid: row.uuid, value: node.value }
      })

      // 2. Insert nodes into DB
      const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)

      // 3. Insert activity logs into DB
      const activityLogs = nodesInsert.map<ActivityLogDb<Node>>((target: Node) => {
        const section = rowsByRowUuid[target.rowUuid]?.sectionName
        const message = ActivityLogMessage.nodeValueImport
        return {
          assessment_uuid: assessmentUuid,
          cycle_uuid: cycleUuid,
          country_iso: countryIso,
          section,
          message,
          target,
          user_id: user.id,
        }
      })
      await ActivityLogRepository.massiveInsert({ activityLogs }, client)

      // 4. Update Redis cache for each affected table
      await Promise.all(
        Array.from(tableNames).map((tableName) =>
          DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true }, client)
        )
      )

      // 5. Update dependencies
      await updateDependencies({ assessment, cycle, country, nodes, user }, client)
    })
  })
}
