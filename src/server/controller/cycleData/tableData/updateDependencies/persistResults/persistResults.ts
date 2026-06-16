import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Node } from 'meta/assessment/node'
import { User } from 'meta/user/user'

import { DataRedisRepository } from 'server/cache/repository/data'
import { ContextResult } from 'server/controller/cycleData/tableData/updateDependencies/context'
import { BaseProtocol, DB } from 'server/db/db'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  result: ContextResult
  user: User
}

export const persistResults = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { result, user } = props
  const { assessment, cycle, nodeUpdates, nodes, nodesDb, rowsByColUuid } = result
  const { countryIso } = nodeUpdates

  if (nodesDb.length > 0) {
    await client.tx(async (tx) => {
      // 1. Insert calculated nodes into DB
      const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, tx)

      // 2. Insert activity logs into DB
      const activityLogs = nodesInsert.map<ActivityLogDb<Node>>((target) => ({
        assessment_uuid: assessment.uuid,
        cycle_uuid: cycle.uuid,
        country_iso: countryIso,
        section: rowsByColUuid[target.colUuid].sectionName,
        message: ActivityLogMessage.nodeValueCalculatedUpdate,
        target,
        user_id: user.id,
      }))
      await ActivityLogRepository.massiveInsert({ activityLogs }, tx)

      // 3. Update redis cache
      await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
    })
  }
}
